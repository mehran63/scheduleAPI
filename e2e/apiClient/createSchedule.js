const { apiHostName } = require('./config');

async function createSchedule(accountId, scheduleData) {
    const response = await fetch(`http://${apiHostName}:3000/accounts/${accountId}/schedules/`, {
        method: 'POST',
        body: JSON.stringify(scheduleData),
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Failed to create schedule ${response.statusText} ${response.status} ${body}`);
    }
    return response.json()
}

exports.createSchedule = createSchedule;