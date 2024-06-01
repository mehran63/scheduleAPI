const accountId = '123'; // Replace with the actual account ID
const scheduleId = 'd81929c6-2d10-4e06-b993-a31b031e2fb4'; // Replace with the actual account ID
fetch(`http://localhost:3000/accounts/${accountId}/schedules/${scheduleId}`, {
    method: 'DELETE',
})
    .then(async response => {
        if (!response.ok) {
            const body = await response.text();
            console.log('Failed to get schedule', response.statusText, response.status, body);
        } else {
            if (response.status === 204) {
                console.log('Schedule deleted successfully');
            } else {
                const data = await response.json()
                console.log('Response received =>', data);
            }
        }
    })
    .catch(error => {
        // Handle any errors here
        console.error('Error received =>', error);
    });
