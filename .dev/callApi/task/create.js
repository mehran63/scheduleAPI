const accountId = '123'; // Replace with the actual account ID
const scheduleId = 'd4148ada-bd38-4923-aa11-72835f64b218'; // Replace with the actual account ID
const taskData = {
    startTime: new Date('2021-09-01T10:00:00Z').toISOString(),
    durationMinutes: 120,
    type: 'WORK',
};

fetch(`http://localhost:3000/accounts/${accountId}/schedules/${scheduleId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
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
