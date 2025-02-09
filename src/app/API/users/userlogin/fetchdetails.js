async function fetchProtectedData() {
    try {
      const response = await fetch('/userlogin/protected', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
  
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
  
      const data = await response.json();
      console.log(data); // Handle the retrieved protected data
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  }