import * as Koa from 'koa';
import {powerswapRouter,hunterRouter} from './routers'
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const secret = process.env.JWT_SECRET || 'jwt_secret';
const mongoose = require('mongoose')
const app = new Koa();
// import {discord} from './bots/discord'
// import tg from './bots/telegram'

const router = Object.assign(powerswapRouter)

app.use(logger())
// discord()
// trust proxy
app.proxy = true
app.keys = ['secret']

try {
  async function db() {
    await mongoose.connect(process.env.MONGO)
    // await mongoose.connect('mongodb://rootUser:rootUserPwd@localhost:27017/powerswap?authSource=admin');
    
    const db = mongoose.connection;
  
    db.on('error', (err: any) => {
      console.log(err);
      process.exit(1)
    });
    db.once('connected', () => {
      console.log('Mongo connected');
      app.emit('ready');
    });
    db.on('reconnected', () => {
      console.log('Mongo re-connected');
    });
    db.on('disconnected', () => {
      console.log('Mongo disconnected');
    });
  }
  
} catch (error) {
  console.log('mongo error', error)
}



app.use(cors()) // you must put "cors" before "jwt" usage
app.use(koaBody())


// Custom 401 handling
app.use(async function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      let errMessage = err.originalError ?
        err.originalError.message :
        err.message
      ctx.body = {
        error: errMessage
      };
      ctx.set("X-Status-Reason", errMessage)
    } else {
      throw err;
    }
  });
});

app.use(jwt({
  secret: secret
}).unless({
  path: [/^\/public/, "/"]
}));



app.use(async(ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

if (process.env.NODE_ENV != 'test') {
   app.use(logger());
 }


app   
   .use(router.routes())
   .use(router.allowedMethods())   

const port = process.env.PORT || 3002
app.listen(port);

console.log(`Server running on http://localhost:${port}`);