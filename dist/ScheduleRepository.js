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
    exports.ScheduleRepository = void 0;
    class ScheduleRepository {
        constructor(prisma) {
            this.prisma = prisma;
        }
        getSchedule(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.schedule.findUnique({
                    where: { id },
                    include: { tasks: true },
                });
            });
        }
        createSchedule(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.schedule.create({ data });
            });
        }
        updateSchedule(id, data) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.schedule.update({
                    where: { id },
                    data,
                });
            });
        }
        deleteSchedule(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.prisma.schedule.delete({
                    where: { id },
                });
            });
        }
    }
    exports.ScheduleRepository = ScheduleRepository;
});
