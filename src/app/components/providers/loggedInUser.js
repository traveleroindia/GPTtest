import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

export default function LoggedInUser() {
    
    useEffect(() => {
        const logToken = () => {
            const token = Cookies.get('user'); // Ensure 'user' is the correct cookie name
            const DecodeToken = jwtDecode(token);
            console.log(DecodeToken);
            
        };

        logToken(); // Log the token when the component mounts

    }, [Cookies.get('user')]); // Empty dependency array to run effect only on mount and unmount

    return (
        <div>
            <h2>Logged In User</h2>
            <p>Check the console for the token log.</p>
        </div>
    );
}