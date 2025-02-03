import { connectDB } from "../../../dbConnection";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectDB(); // Connect to the database

    // Parse the URL to extract query parameters
    const { searchParams } = new URL(req.url);

    // Set up the base query and parameters
    let query = 'SELECT * FROM user';
    const queryParams = [];

    // Check for each parameter in the query string
    if (searchParams.has('id')) {
      query += ' WHERE id = ?';
      queryParams.push(searchParams.get('id'));
    } else if (searchParams.has('email')) {
      query += ' WHERE email = ?';
      queryParams.push(searchParams.get('email'));
    } else if (searchParams.has('phone')) {
      query += ' WHERE phone = ?';
      queryParams.push(searchParams.get('phone'));
    }

    // Execute the query
    const [users] = await db.query(query, queryParams);

    // Log the users to check what data is being returned from the database

    // Return the fetched users as JSON
    return NextResponse.json(users.length ? users : [], { status: 200 }); // Return an empty array if no users found
  } catch (error) {
    // Log the error for debugging
    console.error('Database query failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
