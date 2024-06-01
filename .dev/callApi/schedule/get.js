const accountId = '123'; // Replace with the actual account ID
const scheduleId = 'b58137e3-feff-4748-919c-4d4a81a8c2c0'; // Replace with the actual account ID
fetch(`http://localhost:3000/accounts/${accountId}/schedules/${scheduleId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
    .then(async response => {
        if (!response.ok) {
            const body = await response.text();
            console.log('Failed to get schedule', response.statusText, response.status, body);
        } else {
            const data = await response.json()
            console.log('Response received =>', data);
        }
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error received =>', error);
    });
