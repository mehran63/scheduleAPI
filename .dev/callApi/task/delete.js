const accountId = '123'; // Replace with the actual account ID
const scheduleId = 'd81929c6-2d10-4e06-b993-a31b031e2fb4'; // Replace with the actual account ID
const taskId = '3739108f-bd8a-4924-86d8-1ae78bc31795';
fetch(`http://localhost:3000/accounts/${accountId}/schedules/${scheduleId}/tasks/${taskId}`, {
    method: 'DELETE',
})
    .then(async response => {
        if (!response.ok) {
            const body = await response.text();
            console.log('Failed to get schedule', response.statusText, response.status, body);
        } else {
            if (response.status === 204) {
                console.log('Task deleted successfully');
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
