import { useEffect, useState } from "react";

export default function useFetchBookings() {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const FetchBookings = async () => {
            try {

                const response = await fetch("/API/booking/fetchbookings", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                // console.log('Booking Data IS', data.booking[0],data.user);
                
                setBookings(data.booking);
                setUser(data.user);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        FetchBookings();
    }, []);
        
    return { bookings, user, loading, error };
}
