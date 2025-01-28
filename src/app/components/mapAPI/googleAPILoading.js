export async function loadGoogleApi(apiKey, libraries = '') {
    return new Promise((resolve, reject) => {
        // Check if the script is already in the DOM
        const existingScript = document.querySelector(
            `script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}"]`
        );

        if (existingScript) {
            console.log('Google Maps API script is already loaded.');
            resolve(); // API is already loaded, resolve immediately
            return;
        }

        // Create a new script element if it doesn't exist
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log('Google Maps API script loaded successfully.');
            resolve(); // Resolve the promise when the script is loaded
        };

        script.onerror = () => {
            console.error('Failed to load Google Maps API script.');
            reject(new Error('Failed to load Google Maps API script.'));
        };

        document.head.appendChild(script); // Append the script to the <head>
    });
}
