import { connectDB } from "../../../dbConnection";
import { NextResponse } from "next/server";
import { serialize } from 'cookie';
const bcrypt = require('bcrypt');
const salt = 5;
import jwt from "jsonwebtoken"; // Import jsonwebtoken
const jwtSecret = process.env.JWT_SECRET_KEY; // Replace with a strong, secret key

// Function to generate JWT tokens
const jwtGenerate = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: "1d" }); // Generate a token that expires in 1 day
};
export async function POST(req) {   
    try {
        const db = await connectDB(); // Connect to the database

        // Parse the request body to get the user data
        const body = await req.json(); // Assuming body contains user data in JSON format

        const { email, password } = body;

        // Check if email and password are provided
        if (!email || !password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        // ============================= Query to find the user by email or phone =============================
        const userSql = 'SELECT password FROM user WHERE email = ? OR phone = ?';
        const userParams = [email, email]; // if both email and phone are the same type of identifier

        const [storedUser] = await db.query(userSql, userParams);

        // Check if the user exists
        if (storedUser.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // ============================= Checking Password =============================

       
        const isValid = await bcrypt.compare(password, storedUser[0].password);
        

        // If the passwords do not match, return an error
        if (!isValid) {
            const hashedPassword = await bcrypt.hash(password, salt); // Create a new hash using the same rounds and salt
            console.log(hashedPassword);
            
            return NextResponse.json({ error: 'Invalid password', password: hashedPassword }, { status: 401 });
        }

        // ============================= Returning User Details =============================
        const userDetailsSql = 'SELECT * FROM user WHERE email = ? OR phone = ?';
        const userDetailsParams = [email, email];

        const [userDetails] = await db.query(userDetailsSql, userDetailsParams);
        
        // Return a success response with user details but exclude the password
        const { password: hashedPassword, ...userDetailsWithoutPassword } = userDetails[0];

        // Set cookie with user ID
        const user = userDetails[0]
        const userInfo ={
            id : user.id,
            name : user.name,
            email : user.email,
            phone : user.phone,
        } 

        
    // Generate a JWT token for the user
    const token = jwtGenerate(userInfo);

        const serialised = serialize('user', token,  {
        httpOnly: false,
        // secure: process.env.NODE_ENV === 'production', // Use Secure attribute in production
        // maxAge: 60 * 60 * 24, // 1 day
        maxAge: 60 * 3, // 3 minute
        sameSite: 'strict',
        path: '/'
        });


        // Return a success response with user details but exclude the password
        const response = NextResponse.json({
            message: 'Logged in successfully',
            userDetails: userDetailsWithoutPassword
        }, { status: 200 });

        response.headers.set('Set-Cookie', serialised);
        return response;

    } catch (error) {
        // Log the error for debugging
        console.error('Database query failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}