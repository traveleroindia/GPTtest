import { connectDB } from "../../../dbConnection";
import { NextResponse } from "next/server";

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
    const queryParams = [body.name, body.email, body.phone, body.password];

    // Execute the insertion
    const [result] = await db.query(query, queryParams);

    // Return the result of the insertion
    return NextResponse.json({ message: 'User added successfully', userId: result.insertId }, { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error('Database insertion failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}