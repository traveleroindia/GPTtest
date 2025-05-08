import { connectDB } from "../../dbConnection"; 
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"; 

const jwtSecret = process.env.JWT_SECRET_KEY; // Ensure this is set correctly in your environment

export async function GET(req) { 
    // Only allow GET requests
    if (req.method !== 'GET') {
        console.log("Method is ", req.method);
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        // Get the JWT from cookies
       const cookie = req.cookies.get('user')?.value;  
        if (!cookie) {
            return NextResponse.json({ message: 'No token found' }, { status: 401 });
        }

        // Verify the JWT
        console.log("Cookie retrieved:", cookie);
        const decoded = jwt.verify(cookie, jwtSecret);

        const userId = decoded.userId; // Extract userId from decoded JWT payload
        console.log("Decoded ID found:", userId);

        // Connect to the database
        const db = await connectDB();
        
        // SQL query to fetch user bookings
        const query = `SELECT DISTINCT 
    b.id as bookingID,
    DATE_FORMAT(b.created_at, '%d-%m-20%y') AS BookingDate,
    b.origin_lat,
    b.origin_lng,
    b.origin_address,
    b.destination_lat,
    b.destination_lng,
    b.destination_address,
    b.google_maps_url,
    b.booking_type,
    b.time_duration,
    DATE_FORMAT(b.trip_date,'%d-%m-20%y') as trip_date,
    b.pickup_time,
    DATE_FORMAT(b.return_pickup_date, '%d-%m-20%y') AS return_pickup_date,
    fd.fare, 
    fd.discount, 
    fd.finalFare,
    fd.vehicle, 
    fd.imagelink, 
    fd.km, 
    fd.fareDistance,
    fd.perkmCharge,
    fd.perHourCharge, 
    fd.nightCharge,
    fd.passenger, 
    fd.tollCharge,
    sm.status as status
FROM bookings b 
JOIN faredetails fd ON b.id = fd.booking_id 
LEFT JOIN status_master sm ON sm.id = b.status 
WHERE b.user_id = ? 
ORDER BY BookingDate DESC;
`;

        // Query the database for bookings
        const bookings = await db.query(query, [userId]);
console.log(decoded);
        
return NextResponse.json({  user: decoded,booking: bookings[0] }, { status: 200 });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ message: 'Error fetching bookings', error: error.message }, { status: 500 });
    }
};