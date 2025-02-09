import { connectDB } from "../../dbConnection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await connectDB(); // Connect to the database

    // Parse the request body to get the user data
    const body = await req.json(); // Assuming body contains user data in JSON format

    const { userDetails, bookingDetails, fareDetails } = body;

    // Check if userDetails is valid
    if (!userDetails || typeof userDetails !== 'object') {
      return NextResponse.json({ error: 'Invalid userDetails' }, { status: 400 });
    }

    // Check if bookingDetails is valid
    if (!bookingDetails || typeof bookingDetails !== 'object') {
      return NextResponse.json({ error: 'Invalid bookingDetails' }, { status: 400 });
    }

    // Check if fareDetails is valid
    if (!fareDetails || typeof fareDetails !== 'object') {
      return NextResponse.json({ error: 'Invalid fareDetails' }, { status: 400 });
    }

    // ==================================================================================== Checking if User Email Exists

    const emailexistsSql = 'SELECT COUNT(*) AS count FROM user WHERE email = ? ';
    const emailParams = [userDetails.email];

    const [emailexists] = await db.query(emailexistsSql, emailParams);

    // If the user already exists, return an error
    if (emailexists[0].count > 0) {
      return NextResponse.json({ error: 'Email Address already exists! Try Login or use a diffrent Email' }, { status: 409 });
    }


     // ==================================================================================== Checking if User Phone Exists

     const phoneexistsSql = 'SELECT COUNT(*) AS count FROM user WHERE phone = ?';
     const phoneexistsParams = [ userDetails.phone];
 
     const [phoneexists] = await db.query(phoneexistsSql, phoneexistsParams);
 
     // If the user already phoneexists, return an error
     if (phoneexists[0].count > 0) {
       return NextResponse.json({ error: 'This phone number is exists! Try Login or use a diffrent Phone number' }, { status: 409 });
     }

    // ==================================================================================== Adding User Details

    const userInsertQuery = 'INSERT INTO user (name, email, phone, password) VALUES (?, ?, ?, ?)';
    const userInsertParams = [userDetails.name, userDetails.email, userDetails.phone, userDetails.password];

    const [userResult] = await db.query(userInsertQuery, userInsertParams);

    // ==================================================================================== Adding Booking Details

    const bookingQuery = `
    INSERT INTO bookings
        (origin_lat, origin_lng, origin_address, destination_lat, destination_lng, destination_address,
        google_maps_url, booking_type, time_duration, trip_date, pickup_time, return_pickup_date,user_id)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const bookingParams = [
      bookingDetails.origin_lat,
      bookingDetails.origin_lng,
      bookingDetails.origin_address,
      bookingDetails.destination_lat,
      bookingDetails.destination_lng,
      bookingDetails.destination_address,
      bookingDetails.google_maps_url,
      bookingDetails.booking_type,
      bookingDetails.time_duration,
      bookingDetails.trip_date,
      bookingDetails.pickup_time,
      bookingDetails.return_pickup_date,
      bookingDetails.user_id = userResult.insertId
    ];

    const [bookingResult] = await db.query(bookingQuery, bookingParams);

    // ==================================================================================== Adding Fare Details

    const fareQuery = `
    INSERT INTO faredetails
        (fare, discount, finalFare, vehicle, imagelink, km, fareDistance, perkmCharge, perHourCharge, 
        nightCharge, passenger, tollCharge,user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const fareParams = [
      fareDetails.fare,
      fareDetails.discount,
      fareDetails.finalFare,
      fareDetails.vehicle,
      fareDetails.imagelink,
      fareDetails.km,
      fareDetails.fareDistance,
      fareDetails.perkmCharge,
      fareDetails.perHourCharge,
      fareDetails.nightCharge,
      fareDetails.passenger,
      fareDetails.tollCharge,
      fareDetails.user_id = userResult.insertId
    ];

    const [fareResult] = await db.query(fareQuery, fareParams);

    // Returning a success response with userId, bookingId, and fareId
    return NextResponse.json(
      {
        message: 'User, booking, and fare added successfully!',
        userId: userResult.insertId,
        bookingId: bookingResult.insertId,
        fareId: fareResult.insertId,
      },
      { status: 201 }
    );
    
  } catch (error) {
    // Log the error for debugging
    console.error('Database insertion failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}