
import { PrismaClient, Schedule, Task } from '@prisma/client';

export class TaskRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getTask(id: string, includeSchedule: boolean = false): Promise<(Task & { schedule?: Schedule }) | null> {
        return this.prisma.task.findUnique({
            where: { id },
            include: { schedule: includeSchedule },
        });
    }

    // Add methods for create, update, delete
    async createTask(data: Omit<Task, 'id'>): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async updateTask(id: string, data: Omit<Task, 'id' | 'accountId' | 'scheduleId'>): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    async deleteTask(id: string): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        });
    }

    async getTasks(scheduleId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { scheduleId },
        });
    }
}