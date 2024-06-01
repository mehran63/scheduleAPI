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
define(["require", "exports", "koa-router", "@prisma/client", "./TaskRepository"], function (require, exports, koa_router_1, client_1, TaskRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    koa_router_1 = __importDefault(koa_router_1);
    const router = new koa_router_1.default();
    const prisma = new client_1.PrismaClient();
    const taskRepository = new TaskRepository_1.TaskRepository(prisma);
    router.get('/task/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(100, ctx);
        const task = yield taskRepository.getTask(ctx.params.id);
        ctx.body = task;
        console.log(200, ctx);
    }));
    // Add routes for create, update, delete as necessary
    exports.default = router;
});
