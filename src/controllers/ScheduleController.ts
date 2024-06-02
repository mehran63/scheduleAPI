import Router from 'koa-router';
import { PrismaClient, Task } from '@prisma/client';
import { ScheduleRepository } from '../respositories/ScheduleRepository';

const prisma = new PrismaClient();
const scheduleRepository = new ScheduleRepository(prisma);

interface IScheduleRequest {
    startTime: string;
    endTime: string;
}

interface IScheduleResponse {
    id: string;
    startTime: string;
    endTime: string;
    accountId: number;
    agentId: number;
}

const getSchedule = async (ctx: Router.RouterContext) => {
    // TODO
    // Validation to check agentId in token has access to accountId
    const schedule = await scheduleRepository.getSchedule(ctx.params.id);
    if (!schedule) {
        ctx.status = 404;
        return;
    }

    if (schedule.accountId !== parseInt(ctx.params.accountId)) {
        ctx.status = 403;
        return;
    }

    const response: IScheduleResponse = {
        id: schedule.id,
        agentId: schedule.agentId,
        accountId: schedule.accountId,
        startTime: schedule.startTime.toISOString(),
        endTime: schedule.endTime.toISOString(),
    };
    ctx.body = response;
    ctx.status = 200;
};

const getAllSchedules = async (ctx: Router.RouterContext) => {
    // TODO: Validation to check agentId in token has access to accountId
    // TODO: pagination
    const schedules = await scheduleRepository.getSchedulesByAccount(parseInt(ctx.params.accountId));
    const response: IScheduleResponse[] = schedules.map((schedule) => ({
        id: schedule.id,
        agentId: schedule.agentId,
        accountId: schedule.accountId,
        startTime: schedule.startTime.toISOString(),
        endTime: schedule.endTime.toISOString(),
    }));
    ctx.body = response;
    ctx.status = 200;
};

const createSchedule = async (ctx: Router.RouterContext) => {
    // TODO
    // agentId supposed to be from bearer token, but for now we just hardcode it
    // the next step is to implement authentication
    const agentId = 0;

    // TODO
    // A validation needed to check accountId be a valid existing account

    const request = <IScheduleRequest>ctx.request.body;
    const accountId = parseInt(ctx.params.accountId);
    const scheduleInput = {
        accountId,
        agentId,
        startTime: new Date(request.startTime),
        endTime: new Date(request.endTime),
    };

    if (scheduleInput.startTime >= scheduleInput.endTime) {
        ctx.status = 400;
        ctx.body = { message: 'startTime must be before endTime' };
        return;
    }

    const schedule = await scheduleRepository.createSchedule(scheduleInput);

    ctx.body = {
        ...schedule,
        startTime: schedule.startTime.toISOString(),
        endTime: schedule.endTime.toISOString(),
    };
    ctx.status = 201;
};

const updatedSchedule = async (ctx: Router.RouterContext) => {
    // TODO
    // Validation to check agentId in token has access to accountId
    const schedule = await scheduleRepository.getSchedule(ctx.params.id, true);
    if (!schedule) {
        ctx.status = 404;
        return;
    }

    if (schedule.accountId !== parseInt(ctx.params.accountId)) {
        ctx.status = 403;
        return;
    }

    const request = <IScheduleRequest>ctx.request.body;

    const scheduleInput = {
        accountId: schedule.accountId,
        agentId: schedule.agentId,
        startTime: new Date(request.startTime),
        endTime: new Date(request.endTime),
    };
    if (scheduleInput.startTime >= scheduleInput.endTime) {
        ctx.status = 400;
        ctx.body = { message: 'startTime must be before endTime' };
        return;
    }

    for (const task of schedule.tasks ?? []) {
        const taskStartTime = new Date(task.startTime);
        const taskEndTime = new Date(taskStartTime.getTime() + task.duration * 60 * 1000);

        if (
            scheduleInput.startTime > taskStartTime ||
            scheduleInput.endTime < taskEndTime
        ) {
            ctx.status = 400;
            ctx.body = { message: 'New schedule must overlap with existing tasks' };
            return;
        }
    }

    const updatedSchedule = await scheduleRepository.updateSchedule(ctx.params.id, scheduleInput);

    ctx.body = {
        ...updatedSchedule,
        startTime: updatedSchedule.startTime.toISOString(),
        endTime: updatedSchedule.endTime.toISOString(),
    };
    ctx.status = 200;
};

const deleteSchedule = async (ctx: Router.RouterContext) => {
    // TODO
    // Validation to check agentId in token has access to accountId
    const schedule = await scheduleRepository.getSchedule(ctx.params.id, true);
    if (!schedule) {
        ctx.status = 404;
        return;
    }

    if (schedule.accountId !== parseInt(ctx.params.accountId)) {
        ctx.status = 403;
        return;
    }

    if (((schedule as any).tasks as Task[])?.length > 0) {
        ctx.status = 400;
        ctx.body = { message: 'Cannot delete schedule with existing tasks' };
        return;
    }

    await scheduleRepository.deleteSchedule(ctx.params.id);
    ctx.status = 204;
};

export {
    getSchedule,
    getAllSchedules,
    createSchedule,
    updatedSchedule,
    deleteSchedule,
};