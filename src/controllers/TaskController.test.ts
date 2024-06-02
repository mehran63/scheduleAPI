import { TaskRepository } from '../respositories/TaskRepository';
import { ScheduleRepository } from '../respositories/ScheduleRepository';
import { createTask, deleteTask, getTask, updateTask } from './TaskController';

describe('TaskController', () => {
    describe('getTask', () => {
        it('should get a task', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue({ id: '1' } as any);
            const mockCtx: any = { params: { scheduleId: '1' } };
            // act
            await getTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(200);
            expect(mockCtx.body).toEqual({ id: '1' });
            expect(TaskRepository.prototype.getTask).toHaveBeenCalledWith('1', true);
        });

        it('should return 404 if task not found', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue(null);
            const mockCtx: any = { params: { scheduleId: '1' } };
            // act
            await getTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toBeUndefined();
        });
    });

    describe('createTask', () => {
        it('should create a task', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule').mockResolvedValue({ id: '1' } as any);
            jest.spyOn(TaskRepository.prototype, 'createTask').mockResolvedValue({ id: '1' } as any);
            const mockCtx: any = {
                params: { scheduleId: '1', accountId: '1' },
                request: { body: { startTime: '2024-07-10T15:00:00.000Z', durationMinutes: 60, type: 'WORK' } }
            };
            // act
            await createTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(201);
            expect(mockCtx.body).toEqual({ id: '1' });
            expect(TaskRepository.prototype.createTask).toHaveBeenCalledWith({
                startTime: new Date('2024-07-10T15:00:00.000Z'),
                duration: 60,
                type: 'WORK',
                scheduleId: '1',
                accountId: 1,
            });
        });

        it('should return 404 if schedule not found', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule').mockResolvedValue(null);
            const mockCtx: any = {
                params: { scheduleId: '1' },
                request: { body: { startTime: '2024-07-10T15:00:00.000Z', durationMinutes: 60 } }
            };
            // act
            await createTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toEqual({ message: 'Schedule not found' });
        });

        it('should return 400 if task is outside schedule timeframe', async () => {
            // arrange
            jest.spyOn(ScheduleRepository.prototype, 'getSchedule').mockResolvedValue({ startTime: new Date('2024-07-10T15:00:00.000Z'), endTime: new Date('2024-07-10T17:00:00.000Z') } as any);
            const mockCtx: any = {
                params: { scheduleId: '1' },
                request: { body: { startTime: '2024-07-10T14:00:00.000Z', durationMinutes: 60 } }
            };
            // act
            await createTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'Task is outside the schedule timeframe' });
        });
    });

    describe('updateTask', () => {
        it('should update a task', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue({
                id: '1', scheduleId: '1',
                schedule: {
                    startTime: new Date('2024-07-10T15:00:00.000Z'),
                    endTime: new Date('2024-07-10T17:00:00.000Z')
                }
            } as any);
            jest.spyOn(TaskRepository.prototype, 'updateTask').mockResolvedValue({ id: '1' } as any);
            const mockCtx: any = {
                params: { id: '1', scheduleId: '1' },
                request: {
                    body: {
                        startTime: '2024-07-10T15:00:00.000Z',
                        durationMinutes: 60, type: 'WORK'
                    }
                }
            };
            // act
            await updateTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(200);
            expect(mockCtx.body).toEqual({ id: '1' });
            expect(TaskRepository.prototype.updateTask).toHaveBeenCalledWith('1', {
                startTime: new Date('2024-07-10T15:00:00.000Z'),
                duration: 60,
                type: 'WORK',
            });
        });

        it('should return 404 if task not found', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue(null);
            const mockCtx: any = { params: { id: '1', scheduleId: '1' } };
            // act
            await updateTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 400 if task does not belong to schedule', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue({ id: '1', scheduleId: '2' } as any);
            const mockCtx: any = {
                params: { id: '1', scheduleId: '1' },
                request: {
                    body: {
                        startTime: '2024-07-10T15:00:00.000Z',
                        durationMinutes: 60
                    }
                }
            };
            // act
            await updateTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'Task does not belong to schedule' });
        });

        it('should return 400 if task is outside schedule timeframe', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue({
                id: '1', scheduleId: '1',
                schedule: {
                    startTime: new Date('2024-07-10T15:00:00.000Z'),
                    endTime: new Date('2024-07-10T17:00:00.000Z')
                }
            } as any);
            const mockCtx: any = {
                params: { id: '1', scheduleId: '1' },
                request: {
                    body: {
                        startTime: '2024-07-10T14:00:00.000Z',
                        durationMinutes: 60
                    }
                }
            };
            // act
            await updateTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'Task is outside the schedule timeframe' });
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue(
                {
                    id: '1',
                    scheduleId: '1',
                    schedule: {
                        startTime: new Date('2024-07-10T15:00:00.000Z'),
                        endTime: new Date('2024-07-10T17:00:00.000Z')
                    }
                } as any);
            jest.spyOn(TaskRepository.prototype, 'deleteTask').mockResolvedValue({ id: '1' } as any);
            const mockCtx: any = {
                params: {
                    id: '1', scheduleId: '1'
                }
            };
            // act
            await deleteTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(204);
            expect(mockCtx.body).toBeFalsy();
            expect(TaskRepository.prototype.deleteTask).toHaveBeenCalledWith('1');
        });

        it('should return 404 if task not found', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask').mockResolvedValue(null);
            const mockCtx: any = { params: { id: '1' } };
            // act
            await deleteTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(404);
            expect(mockCtx.body).toBeUndefined();
        });

        it('should return 400 if task does not belong to schedule', async () => {
            // arrange
            jest.spyOn(TaskRepository.prototype, 'getTask')
                .mockResolvedValue({ id: '1', scheduleId: '2' } as any);
            const mockCtx: any = { params: { id: '1', scheduleId: '1' } };
            // act
            await deleteTask(mockCtx);
            // assert
            expect(mockCtx.status).toBe(400);
            expect(mockCtx.body).toEqual({ message: 'Task does not belong to schedule' });
        });

    });
});