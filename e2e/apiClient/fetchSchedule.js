const { apiHostName } = require('./config');

async function fetchSchedule(accountId, scheduleId) {
    const response = await fetch(`http://${apiHostName}:3000/accounts/${accountId}/schedules/${scheduleId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Failed to get schedule ${response.statusText} ${response.status} ${body}`);
    }
    return response.json()
}

exports.fetchSchedule = fetchSchedule;