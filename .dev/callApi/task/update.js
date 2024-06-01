const accountId = '123'; // Replace with the actual account ID
const scheduleId = 'd4148ada-bd38-4923-aa11-72835f64b218'; // Replace with the actual account ID
const taskId = '3739108f-bd8a-4924-86d8-1ae78bc31795';
const scheduleData = {
    startTime: new Date('2021-09-01T10:00:00Z').toISOString(),
    durationMinutes: 180,
    type: 'WORK',
};
fetch(`http://localhost:3000/accounts/${accountId}/schedules/${scheduleId}/tasks/${taskId}`, {
    method: 'put',
    body: JSON.stringify(scheduleData),
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
