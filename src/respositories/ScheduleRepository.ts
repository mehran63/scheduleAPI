import { PrismaClient, Schedule, Task } from '@prisma/client';

export class ScheduleRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getSchedule(id: string, includeTasks: boolean = false): Promise<(Schedule & { tasks?: Task[] }) | null> {
        return this.prisma.schedule.findUnique({
            where: { id },
            include: { tasks: includeTasks },
        });
    }

    async getSchedulesByAccount(accountId: number): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            where: { accountId },
        });
    }

    async createSchedule(data: Omit<Schedule, 'id'>): Promise<Schedule> {
        return this.prisma.schedule.create({ data });
    }

    async updateSchedule(id: string, data: Omit<Schedule, 'id'>): Promise<Schedule> {
        return this.prisma.schedule.update({
            where: { id },
            data,
        });
    }

    async deleteSchedule(id: string): Promise<Schedule> {
        return this.prisma.schedule.delete({
            where: { id },
        });
    }

}
