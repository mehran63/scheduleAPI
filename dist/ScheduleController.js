var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "koa-router", "@prisma/client", "./ScheduleRepository"], function (require, exports, koa_router_1, client_1, ScheduleRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    koa_router_1 = __importDefault(koa_router_1);
    const router = new koa_router_1.default();
    const prisma = new client_1.PrismaClient();
    const scheduleRepository = new ScheduleRepository_1.ScheduleRepository(prisma);
    router.get('accounts/:accountId/schedules/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // TODO
        // Validation to check agentId in token has access to accountId
        const schedule = yield scheduleRepository.getSchedule(ctx.params.id);
        if (!schedule) {
            ctx.status = 404;
            return;
        }
        if (schedule.accountId !== parseInt(ctx.params.accountId)) {
            ctx.status = 403;
            return;
        }
        const response = {
            agentId: schedule.agentId,
            accountId: schedule.accountId,
            startTime: schedule.startTime.toISOString(),
            endTime: schedule.endTime.toISOString(),
        };
        ctx.body = response;
        ctx.status = 200;
    }));
    // Add routes for create, update, delete 
    router.post('accounts/:accountId/schedules/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // TODO
        // agentId supposed to be from bearer token, but for now we just hardcode it
        // the next step is to implement authentication
        const agentId = 0;
        // TODO
        // A validation needed to check accountId be a valid existing account
        const request = ctx.request.body;
        const accountId = parseInt(ctx.params.accountId);
        const schedule = yield scheduleRepository.createSchedule({
            accountId,
            agentId,
            startTime: new Date(request.startTime),
            endTime: new Date(request.endTime),
        });
        ctx.body = schedule;
        ctx.status = 201;
    }));
    exports.default = router;
});
