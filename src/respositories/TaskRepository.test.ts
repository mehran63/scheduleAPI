import { Task } from "@prisma/client";
import { TaskRepository } from "./TaskRepository";

describe('TaskRepository', () => {
    it('should get a task', async () => {
        // arrange
        const prismaClient: any = {
            task: {
                findUnique: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new TaskRepository(prismaClient);
        // act
        const actual = await repo.getTask('1');
        // assert
        expect(prismaClient.task.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
            include: { schedule: false },
        });
        expect(actual).toEqual({ id: '1' });
    });

    it('should create a task', async () => {
        // arrange
        const prismaClient: any = {
            task: {
                create: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new TaskRepository(prismaClient);
        const startTime = new Date('2024-07-10 15:00:00.000Z');
        const data: Omit<Task, 'id'> = { startTime, duration: 60, type: 'WORK', accountId: 1, scheduleId: '1' };
        // act
        const actual = await repo.createTask(data);
        // assert
        expect(prismaClient.task.create).toHaveBeenCalledWith({ data });
        expect(actual).toEqual({ id: '1' });
    });

    it('should update a task', async () => {
        // arrange
        const prismaClient: any = {
            task: {
                update: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new TaskRepository(prismaClient);
        const startTime = new Date('2024-07-10 15:00:00.000Z');
        const data: Omit<Task, 'id'> = { startTime, duration: 60, type: 'WORK', accountId: 1, scheduleId: '1' };
        // act
        const actual = await repo.updateTask('1', data);
        // assert
        expect(prismaClient.task.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data,
        });
        expect(actual).toEqual({ id: '1' });
    });

    it('should delete a task', async () => {
        // arrange
        const prismaClient: any = {
            task: {
                delete: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new TaskRepository(prismaClient);
        // act
        await repo.deleteTask('1');
        // assert
        expect(prismaClient.task.delete).toHaveBeenCalledWith({
            where: { id: '1' },
        });
    });
});