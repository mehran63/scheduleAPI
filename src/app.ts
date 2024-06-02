import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { oas } from 'koa-oas3';
import router from './router';

async function bootstrap() {
    const app = new Koa();

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err: any) {
            console.log(101, err.message, err);
            ctx.status = err.status || 500;
            ctx.body = { message: err.message || 'Internal Server Error', suggestions: err.suggestions };
            ctx.app.emit('error', err, ctx);
        }
    });

    app.use(bodyParser());
    const oasMw = await oas({
        file: `${__dirname}/openapi.yaml`,
        endpoint: '/openapi.json',
    })
    app.use(oasMw);

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(3000);

    console.log('Server running on port 3000');
}

bootstrap().catch(console.error);