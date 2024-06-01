
// TaskController.ts
import Router from 'koa-router';
import { PrismaClient, Task } from '@prisma/client';
import { TaskRepository } from './TaskRepository';
import { ScheduleRepository } from './ScheduleRepository';

const router = new Router();
const prisma = new PrismaClient();
const taskRepository = new TaskRepository(prisma);
const scheduleRepository = new ScheduleRepository(prisma);

const taskTypes = ['WORK', 'BREAK'] as const;
type TaskType = typeof taskTypes[number];

interface ITaskRequest {
    startTime: string;
    durationMinutes: number;
    type: TaskType;
}

router.get('/accounts/:accountId/schedules/:scheduleId/tasks', async (ctx) => {
    const schedule = await scheduleRepository.getSchedule(ctx.params.scheduleId, true);
    if (!schedule) {
        ctx.status = 404;
        return;
    }
    ctx.body = (schedule as any).tasks as Task[];
    ctx.status = 200;
    console.log(100, ctx.body, ctx.status);
});

router.get('/accounts/:accountId/schedules/:scheduleId/tasks/:id', async (ctx) => {
    const task = await taskRepository.getTask(ctx.params.id);
    if (!task) {
        ctx.status = 404;
        return;
    }
    ctx.body = task;
    ctx.status = 200;
});

router.post('/accounts/:accountId/schedules/:scheduleId/tasks', async (ctx) => {
    const request = <ITaskRequest>ctx.request.body;
    const taskInput = {
        startTime: new Date(request.startTime),
        duration: request.durationMinutes,
        type: request.type,
        accountId: parseInt(ctx.params.accountId),
        scheduleId: ctx.params.scheduleId,
    };

    const schedule = await scheduleRepository.getSchedule(ctx.params.scheduleId);

    if (!schedule) {
        ctx.status = 404;
        ctx.body = { message: 'Schedule not found' };
        return;
    }

    const startTime = new Date(request.startTime);
    const endTime = new Date(startTime.getTime() + request.durationMinutes * 60000);

    if (startTime < schedule.startTime || endTime > schedule.endTime) {
        ctx.status = 400;
        ctx.body = { message: 'Task is outside the schedule timeframe' };
        return;
    }

    const task = await taskRepository.createTask(taskInput);
    ctx.body = task;
    ctx.status = 201;
});

router.put('/accounts/:accountId/schedules/:scheduleId/tasks/:id', async (ctx) => {
    const task = await taskRepository.getTask(ctx.params.id, true);
    if (!task) {
        ctx.status = 404;
        return;
    }

    const request = <ITaskRequest>ctx.request.body;
    const taskInput = {
        startTime: new Date(request.startTime),
        duration: request.durationMinutes,
        type: request.type,
    };

    if (task.scheduleId !== ctx.params.scheduleId || !task.schedule) {
        ctx.status = 400;
        ctx.body = { message: 'Task does not belong to schedule' };
        return;
    }

    const startTime = new Date(request.startTime);
    const endTime = new Date(startTime.getTime() + request.durationMinutes * 60000);
    if (startTime < task.schedule.startTime || endTime > task.schedule.endTime) {
        ctx.status = 400;
        ctx.body = { message: 'Task is outside the schedule timeframe' };
        return;
    }

    const updatedTask = await taskRepository.updateTask(ctx.params.id, taskInput);
    ctx.body = updatedTask;
    ctx.status = 200;
});

router.delete('/accounts/:accountId/schedules/:scheduleId/tasks/:id', async (ctx) => {
    const task = await taskRepository.getTask(ctx.params.id, true);
    if (!task) {
        ctx.status = 404;
        return;
    }

    if (task.scheduleId !== ctx.params.scheduleId || !task.schedule) {
        ctx.status = 400;
        ctx.body = { message: 'Task does not belong to schedule' };
        return;
    }

    await taskRepository.deleteTask(ctx.params.id);
    ctx.status = 204;
});


export default router;