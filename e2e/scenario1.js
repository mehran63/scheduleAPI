/*
Create schedule and fetches the schedule
 */
const { createSchedule } = require('./apiClient/createSchedule');
const { fetchSchedule } = require('./apiClient/fetchSchedule');
const { apiHostName } = require('./apiClient/config');

const scenario1 = async () => {
    console.log('Starting scenario 1', apiHostName);

    const accountId = '123';
    const scheduleData = {
        startTime: new Date('2021-09-01T10:00:00Z').toISOString(),
        endTime: new Date('2021-09-01T14:00:00Z').toISOString(),
    };

    const data = await createSchedule(accountId, scheduleData);
    if (!data.id) {
        console.log('No schedule received from creation. Stopping execution.');
        process.exit(1);
    }

    const schedule = await fetchSchedule(accountId, data.id);
    console.log('Fetched schedule:', schedule);

    if (!schedule) {
        throw new Error('No schedule found');
    }

    if (schedule.startTime !== scheduleData.startTime) {
        throw new Error(`Start time mismatch. Expected ${scheduleData.startTime} but got ${schedule.startTime}`);
    }

    if (schedule.endTime !== scheduleData.endTime) {
        throw new Error(`End time mismatch. Expected ${scheduleData.endTime} but got ${schedule.endTime}`);
    }

    console.log('Scenario 1 completed successfully');
}

exports.scenario1 = scenario1;