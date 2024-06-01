const accountId = '123'; // Replace with the actual account ID
const scheduleData = {
    startTime: new Date('2021-09-01T10:00:00Z').toISOString(),
    endTime: new Date('2021-09-01T14:00:00Z').toISOString(),
};
fetch(`http://localhost:3000/accounts/${accountId}/schedules/`, {
    method: 'POST',
    body: JSON.stringify(scheduleData),
    headers: { 'Content-Type': 'application/json' }
})
    .then(async response => {
        if (!response.ok) {
            const body = await response.text();
            console.log('Failed to create schedule', response.statusText, response.status, body);
        } else {
            const data = await response.json()
            console.log('Response received =>', data);
        }
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error received =>', error);
    });
