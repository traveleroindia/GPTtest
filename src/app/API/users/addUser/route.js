import { connectDB } from "../../../dbConnection";
import { NextResponse } from "next/server";
import { serialize } from 'cookie';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY;
const saltRound = 5;
// Function to generate JWT tokens
const jwtGenerate = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: "1d" }); // Generate a token that expires in 1 day
};

// Function to verify JWT tokens
const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
};

export async function POST(req) {
  try {
    const db = await connectDB(); // Connect to the database

    // Parse the request body to get the user data
    const body = await req.json(); // Assuming body contains user data as JSON

    // Prepare the SQL statements for checking if email or phone is already taken
    const existsSql = 'SELECT COUNT(*) FROM user WHERE email = ? OR phone = ?';
    const existsParams = [body.email, body.phone];

    // Execute the exists query
    const [exists] = await db.query(existsSql, existsParams);

    // If the user already exists, return an error
    if (exists[0]['COUNT(*)'] > 0) {
      return NextResponse.json({ error: 'Email or phone number is already taken' }, { status: 409 });
    }

    // Prepare the SQL statement for inserting a new user
    const query = 'INSERT INTO user (name, email, phone, password) VALUES (?, ?, ?, ?)';

    const hashedPassword = await bcrypt.hash(body.password, saltRound);
    const queryParams = [body.name, body.email, body.phone, hashedPassword];

    // Execute the insertion
    const [result] = await db.query(query, queryParams);

    // Get the newly created user data
    const userInfo = {
      userId: result.insertId,
      email: body.email,
      name: body.name,
      phone : body.phone,
    };

    // Generate a JWT token for the user
    const token = jwtGenerate(userInfo);

    // Set cookie with JWT token
    const serialised = serialize('user', token, {
      httpOnly: false,
      // secure: process.env.NODE_ENV === 'production', // Use Secure attribute in production
      // maxAge: 60 * 60 * 24, // 1 day
      maxAge:60 * 3, // 3 minute
      sameSite: 'strict',
      path: '/'
    });

    // Create response object and set cookie header
    const response = NextResponse.json({ message: 'User added successfully', user:userInfo, token }, { status: 201 });
    response.headers.set('Set-Cookie', serialised); // Set the JWT token cookie in the response

    return response;

  } catch (error) {
    // Log the error for debugging
    console.error('Database insertion failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}