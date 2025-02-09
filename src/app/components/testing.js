import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Testing = () => {
  const [cookieData, setCookieData] = useState(null);

  useEffect(() => {
    // Fetch data from the specific cookie
    const token = Cookies.get('user'); // Replace 'jwt' with the name of your cookie
    setCookieData(token);
  }, []);

  return (
    <div>
      {cookieData ? (
        <p>JWT from cookie: {cookieData}</p>
      ) : (
        <p>No JWT found in cookies.</p>
      )}
    </div>
  );
};

export default Testing;