import { connectDB } from "../../../dbConnection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; 

const jwtSecret = process.env.JWT_SECRET_KEY; // Ensure this is set correctly in your environment







export async function POST(req) {
    try {


 const cookie = req.cookies.get('user')?.value;  
        if (!cookie) {
            return NextResponse.json({ message: 'No token found' }, { status: 401 });
        }

        // Verify the JWT
        console.log("Cookie retrieved:", cookie);
        const decoded = jwt.verify(cookie, jwtSecret);

        const userId = decoded.userId; // Extract userId from decoded JWT payload
        console.log("Details found:", decoded);





        const db = await connectDB();
        const body = await req.json();
        // console.log(body);
        
        // Ensure body has the required fields
        if (!body.alt_phone || !body.id) {
            return NextResponse.json({ error: 'Phone number and user ID are required' }, { status: 400 });
        }

        // Check if the alternate number already exists
        const existingPhoneCheck = 'SELECT COUNT(*) as count FROM user WHERE alt_phone = ?';
        const phoneCheck = [body.alt_phone];
        const [checkResult] = await db.query(existingPhoneCheck, phoneCheck);

        if (checkResult[0]['count'] > 0) {
            
            return NextResponse.json({ error: 'This Phone Number already Exists' }, { status: 409 });
        }

        // Update the user's record with the alternate phone number
        const updateQuery = 'UPDATE user SET alt_phone = ? WHERE id = ?';
     
        await db.query(updateQuery, [body.alt_phone, body.id]);
     
        return NextResponse.json({ message: 'Alternate number added successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error adding alternate number:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}