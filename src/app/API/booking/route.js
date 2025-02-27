import { connectDB } from "../../dbConnection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await connectDB(); // Connect to the database

    // Parse the request body to get the user data
    const body = await req.json(); // Assuming body contains user data in JSON format

    const {userId, bookingDetails, fareDetails } = body;
    console.log(body.bookingDetails);
   
    // Check if bookingDetails is valid
    if (!bookingDetails || typeof bookingDetails !== 'object') {
      return NextResponse.json({ error: 'Invalid bookingDetails' }, { status: 400 });
    }

    // Check if fareDetails is valid
    if (!fareDetails || typeof fareDetails !== 'object') {
      return NextResponse.json({ error: 'Invalid fareDetails' }, { status: 400 });
    }


    // ==================================================================================== Adding Booking Details

    const bookingQuery = `
    INSERT INTO bookings
        (origin_lat, origin_lng, origin_address, destination_lat, destination_lng, destination_address,
        google_maps_url, booking_type, time_duration, trip_date, pickup_time, return_pickup_date,user_id)
    VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      bookingDetails.trip_date ,
      bookingDetails.pickup_time,
      bookingDetails.return_pickup_date ,
      bookingDetails.user_id = userId,
    ];

    const [bookingResult] = await db.query(bookingQuery, bookingParams);
    console.log("Booking Created",bookingResult)
    // ==================================================================================== Adding Fare Details

    const fareQuery = `
    INSERT INTO faredetails
        (fare, discount, finalFare, vehicle, imagelink, km, fareDistance, perkmCharge, perHourCharge, 
        nightCharge, passenger, tollCharge,user_id,booking_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

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
      fareDetails.user_id = userId,
      fareDetails.booking_id = bookingResult.insertId,
    ];

    const [fareResult] = await db.query(fareQuery, fareParams);
    console.log(fareResult)

    // Returning a success response with userId, bookingId, and fareId
    return NextResponse.json(
      {
        message: 'Booking, and fare added successfully!',
        userId: userId,
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