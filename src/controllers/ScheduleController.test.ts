import { createSchedule, deleteSchedule, getAllSchedules, getSchedule, updatedSchedule } from './ScheduleController';
import { ScheduleRepository } from '../respositories/ScheduleRepository';

describe('ScheduleController', () => {
    describe('getSchedule', () => {
        it('should get a schedule', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({
                    id: '1',
                    startTime: new Date('2024-07-10 15:00:00.000Z'),
                    endTime: new Date('2024-07-10 17:00:00.000Z'),
                    accountId: 1,
                    agentId: 1,
                } as any);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await getSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(200);
            expect(mockCtx.body).toEqual({
                id: '1',
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T17:00:00.000Z',
                accountId: 1,
                agentId: 1,
            });
            expect(ScheduleRepository.prototype.getSchedule).toHaveBeenCalledWith('1');
        });

        it('should return 404 if schedule not found', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue(null);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await getSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 403 if schedule does not belong to account', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({ accountId: 2 } as any);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await getSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(403);
            expect(mockCtx.body).toBeUndefined();
        });
    });

    describe('getAllSchedules', () => {
        it('should get all schedules', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedulesByAccount')
                .mockResolvedValue([
                    {
                        id: '1',
                        startTime: new Date('2024-07-10 15:00:00.000Z'),
                        endTime: new Date('2024-07-10 17:00:00.000Z'),
                        accountId: 1,
                        agentId: 1,
                    },
                ] as any);
            const mockCtx: any = { params: { accountId: '1' } };
            // act
            await getAllSchedules(mockCtx);
            // assert
            expect(mockCtx.status).toBe(200);
            expect(mockCtx.body).toEqual([{
                id: '1',
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T17:00:00.000Z',
                accountId: 1,
                agentId: 1,
            }]);
            expect(ScheduleRepository.prototype.getSchedulesByAccount).toHaveBeenCalledWith(1);
        });
    });

    describe('createSchedule', () => {
        it('should create a schedule', async () => {
            // arrange
            const mockRequestBody = {
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T17:00:00.000Z',
            };
            jest.spyOn(ScheduleRepository.prototype, 'createSchedule')
                .mockResolvedValue({
                    id: '2',
                    startTime: new Date(mockRequestBody.startTime),
                    endTime: new Date(mockRequestBody.endTime),
                    accountId: 1,
                    agentId: 0,
                } as any);
            const mockCtx: any = {
                params: { accountId: '1' },
                request: { body: mockRequestBody }
            };
            // act
            await createSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(201);
            expect(mockCtx.body).toEqual({
                id: '2',
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T17:00:00.000Z',
                accountId: 1,
                agentId: 0,
            });
            expect(ScheduleRepository.prototype.createSchedule).toHaveBeenCalledWith({
                startTime: new Date(mockRequestBody.startTime),
                endTime: new Date(mockRequestBody.endTime),
                accountId: 1,
                agentId: 0,
            });
        });

        it('should return 400 if startTime is after endTime', async () => {
            // arrange
            const mockRequestBody = {
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T13:00:00.000Z',
            };
            const mockCtx: any = {
                params: { accountId: '1' },
                request: { body: mockRequestBody }
            };
            // act
            await createSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'startTime must be before endTime' });
        });
    });

    describe('updateSchedule', () => {
        it('should update a schedule', async () => {
            // arrange
            const mockRequestBody = {
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T17:00:00.000Z',
            };
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({
                    id: '2',
                    startTime: new Date('2024-06-10T15:00:00.000Z'),
                    endTime: new Date('2024-06-10T17:00:00.000Z'),
                    accountId: 1,
                    agentId: 0,
                } as any);
            jest.spyOn(ScheduleRepository.prototype, 'updateSchedule')
                .mockResolvedValue({
                    id: '2',
                    startTime: new Date(mockRequestBody.startTime),
                    endTime: new Date(mockRequestBody.endTime),
                    accountId: 1,
                    agentId: 0,
                } as any);
            const mockCtx: any = {
                params: { accountId: '1', id: '2' },
                request: { body: mockRequestBody }
            };
            // act
            await updatedSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(200);
            expect(mockCtx.body).toEqual({
                id: '2',
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T17:00:00.000Z',
                accountId: 1,
                agentId: 0,
            });
            expect(ScheduleRepository.prototype.updateSchedule).toHaveBeenCalledWith('2', {
                startTime: new Date(mockRequestBody.startTime),
                endTime: new Date(mockRequestBody.endTime),
                accountId: 1,
                agentId: 0,
            });
        });

        it('should return 400 if startTime is after endTime', async () => {
            // arrange
            const mockRequestBody = {
                startTime: '2024-07-10T15:00:00.000Z',
                endTime: '2024-07-10T13:00:00.000Z',
            };
            const mockCtx: any = {
                params: { accountId: '1', id: '2' },
                request: { body: mockRequestBody }
            };
            // act
            await updatedSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'startTime must be before endTime' });
        });

        it('should return 404 if schedule not found', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue(null);
            const mockCtx: any = { params: { accountId: '1', id: '2' } };
            // act
            await updatedSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 403 if schedule does not belong to account', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({ accountId: 2 } as any);
            const mockCtx: any = { params: { accountId: '1', id: '2' } };
            // act
            await updatedSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(403);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 400 if tasks go outside of the new schedule', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({
                    id: '2',
                    accountId: 1,
                    startTime: new Date('2024-07-10T15:00:00.000Z'),
                    endTime: new Date('2024-07-10T17:00:00.000Z'),
                    tasks: [
                        { id: '1', startTime: '2024-07-10T15:00:00.000Z', duration: 60 },
                    ],
                } as any);
            const mockRequestBody = {
                startTime: '2024-07-10T14:00:00.000Z',
                endTime: '2024-07-10T15:30:00.000Z',
            };
            const mockCtx: any = {
                params: { accountId: '1', id: '2' },
                request: { body: mockRequestBody }
            };
            // act
            await updatedSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'New schedule must overlap with existing tasks' });
        });
    });

    describe('deleteSchedule', () => {
        it('should delete a schedule', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({
                    id: '1',
                    accountId: 1,
                } as any);
            jest.spyOn(ScheduleRepository.prototype, 'deleteSchedule')
                .mockResolvedValue(true as any);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await deleteSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(204);
            expect(mockCtx.body).toBeUndefined();
            expect(ScheduleRepository.prototype.deleteSchedule).toHaveBeenCalledWith('1');
        });

        it('should return 404 if schedule not found', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue(null);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await deleteSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 403 if schedule does not belong to account', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({ accountId: 2 } as any);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await deleteSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(403);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 400 if schedule has tasks', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule')
                .mockResolvedValue({ accountId: 1, tasks: [{ id: '1' }] } as any);
            const mockCtx: any = { params: { accountId: '1', id: '1' } };
            // act
            await deleteSchedule(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'Cannot delete schedule with existing tasks' });
        });
    });
});