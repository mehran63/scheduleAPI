import { ScheduleRepository } from "./ScheduleRepository";

describe('ScheduleRepository', () => {
    it('should get a schedule', async () => {
        // arrange
        const prismaClient: any = {
            schedule: {
                findUnique: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new ScheduleRepository(prismaClient);
        // act
        const actual = await repo.getSchedule('1');
        // assert
        expect(prismaClient.schedule.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
            include: { tasks: false },
        });
        expect(actual).toEqual({ id: '1' });
    });

    it('should get schedules by account', async () => {
        // arrange
        const prismaClient: any = {
            schedule: {
                findMany: jest.fn(async () => [{ id: '1' }]),
            },
        }
        const repo = new ScheduleRepository(prismaClient);
        // act
        const actual = await repo.getSchedulesByAccount(1);
        // assert
        expect(prismaClient.schedule.findMany).toHaveBeenCalledWith({
            where: { accountId: 1 },
        });
        expect(actual).toEqual([{ id: '1' }]);
    });

    it('should create a schedule', async () => {
        // arrange
        const prismaClient: any = {
            schedule: {
                create: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new ScheduleRepository(prismaClient);
        const startTime = new Date('2024-07-10 15:00:00.000Z');
        const endTime = new Date('2024-07-10 17:00:00.000Z');
        // act
        const actual = await repo.createSchedule({ startTime, endTime, accountId: 1, agentId: 1 });
        // assert
        expect(prismaClient.schedule.create).toHaveBeenCalledWith({
            data: { startTime, endTime, accountId: 1, agentId: 1 }
        });
        expect(actual).toEqual({ id: '1' });
    });

    it('should update a schedule', async () => {
        // arrange
        const prismaClient: any = {
            schedule: {
                update: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new ScheduleRepository(prismaClient);
        const startTime = new Date('2024-07-10 15:00:00.000Z');
        const endTime = new Date('2024-07-10 17:00:00.000Z');
        const agentId = 1;
        const accountId = 1;
        // act
        const actual = await repo.updateSchedule('1', { startTime, endTime, agentId, accountId });
        // assert
        expect(prismaClient.schedule.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: { startTime, endTime, agentId, accountId }
        });
        expect(actual).toEqual({ id: '1' });
    });

    it('should delete a schedule', async () => {
        // arrange
        const prismaClient: any = {
            schedule: {
                delete: jest.fn(async () => ({ id: '1' })),
            },
        }
        const repo = new ScheduleRepository(prismaClient);
        // act
        const actual = await repo.deleteSchedule('1');
        // assert
        expect(prismaClient.schedule.delete).toHaveBeenCalledWith({
            where: { id: '1' },
        });
        expect(actual).toEqual({ id: '1' });
    });
});