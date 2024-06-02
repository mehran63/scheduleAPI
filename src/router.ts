
import Router from 'koa-router';
import {
    createSchedule,
    deleteSchedule,
    getAllSchedules,
    getSchedule,
    updatedSchedule
} from './controllers/ScheduleController';
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
} from './controllers/TaskController';

const router = new Router();

router.get('/accounts/:accountId/schedules/:id', getSchedule);
router.get('/accounts/:accountId/schedules', getAllSchedules)
router.post('/accounts/:accountId/schedules/', createSchedule)
router.put('/accounts/:accountId/schedules/:id', updatedSchedule)
router.delete('/accounts/:accountId/schedules/:id', deleteSchedule)

router.get('/accounts/:accountId/schedules/:scheduleId/tasks/:id', getTask);
router.get('/accounts/:accountId/schedules/:scheduleId/tasks', getTasks);
router.post('/accounts/:accountId/schedules/:scheduleId/tasks', createTask);
router.put('/accounts/:accountId/schedules/:scheduleId/tasks/:id', updateTask);
router.delete('/accounts/:accountId/schedules/:scheduleId/tasks/:id', deleteTask);

export default router;
