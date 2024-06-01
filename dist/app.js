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
define(["require", "exports", "koa", "koa-bodyparser", "koa-oas3", "./ScheduleController", "./TaskController"], function (require, exports, koa_1, koa_bodyparser_1, koa_oas3_1, ScheduleController_1, TaskController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    koa_1 = __importDefault(koa_1);
    koa_bodyparser_1 = __importDefault(koa_bodyparser_1);
    ScheduleController_1 = __importDefault(ScheduleController_1);
    TaskController_1 = __importDefault(TaskController_1);
    function bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = new koa_1.default();
            app.use((0, koa_bodyparser_1.default)());
            const oasMw = yield (0, koa_oas3_1.oas)({
                file: `${__dirname}/../openapi.yaml`,
                endpoint: '/openapi.json',
                uiEndpoint: '/'
            });
            app.use(oasMw);
            app.use(ScheduleController_1.default.routes()).use(ScheduleController_1.default.allowedMethods());
            app.use(TaskController_1.default.routes()).use(TaskController_1.default.allowedMethods());
            app.listen(3000);
            console.log('Server running on port 3000');
        });
    }
    bootstrap().catch(console.error);
});
