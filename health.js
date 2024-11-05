async function findNearestCenters() {
    // Load healthcare centers data
    const response = await fetch('healthcare_centers.json');
    const centers = await response.json();

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Calculate distance using Haversine formula
            const sortedCenters = centers
                .map(center => ({
                    ...center,
                    distance: calculateDistance(userLat, userLng, center.lat, center.lng)
                }))
                .sort((a, b) => a.distance - b.distance);

            // Display nearest centers
            displayResults(sortedCenters);
        }, () => {
            alert("Unable to retrieve your location. Please enable location services.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

function displayResults(centers) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    centers.slice(0, 5).forEach(center => { // Display top 5 nearest centers
        const centerDiv = document.createElement('div');
        centerDiv.classList.add('center');
        centerDiv.innerHTML = `
            <strong>${center.name}</strong><br>
            Distance: ${center.distance.toFixed(2)} km
        `;
        resultsDiv.appendChild(centerDiv);
    });
}

