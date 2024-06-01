var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TaskRepository = void 0;
    class TaskRepository {
        constructor(prisma) {
            this.prisma = prisma;
        }
        getTask(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.task.findUnique({
                    where: { id },
                });
            });
        }
        // Add methods for create, update, delete
        createTask(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.task.create({ data });
            });
        }
        updateTask(id, data) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.task.update({
                    where: { id },
                    data,
                });
            });
        }
        deleteTask(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.task.delete({
                    where: { id },
                });
            });
        }
        getTasks(scheduleId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.task.findMany({
                    where: { scheduleId },
                });
            });
        }
    }
    exports.TaskRepository = TaskRepository;
});
