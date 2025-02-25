import { useEffect, useState } from 'react';

export default function LoggedInUser() {
    const [state, setState] = useState('');

    useEffect(() => {
        const user = localStorage.getItem("user"); // Retrieve the user string from localStorage
        if (user) {
            const userinfo = JSON.parse(user); // Parse the user JSON string
            if (userinfo && userinfo.name) { // Check if userinfo exists and has a name property
                setState(userinfo.name); // Set the state with the user's name
                console.log(userinfo); // Log the userinfo object
            }
        }
    }, [localStorage.getItem("user")]); // Empty dependency array to run once on mount

    return (
        <div>
            <h2>Logged In User</h2>
            <p>Name: {state}</p>
        </div>
    );
}