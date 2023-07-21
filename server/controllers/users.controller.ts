import { Context, Next } from 'koa';
import { getUserFromDb } from '../service/user.service'; 
import { createUserInDb } from '../service/user.service'; 
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET || 'jwt_secret';
const jsonwebtoken = require('jsonwebtoken');


export const register = async(ctx:Context, next:Next) => {
  try {
    if (!ctx.request.body.username || !ctx.request.body.password ) {
      ctx.status = 400;
      ctx.body = {
        error: 'expected an object with username, password, email, name but got: ' + ctx.request.body
      }
      return;
    }
  
  
    const {username : reqUsername, password : reqPassword} = ctx.request.body
    const hashPassword = await bcrypt.hash(reqPassword, 5);;
    let user = await getUserFromDb(reqUsername as string); 
    if (!user) {
      await createUserInDb({username:reqUsername,password:hashPassword})
      ctx.status = 200;
      ctx.body = {
        message: "success"
      };
      next();
    } else {
      ctx.status = 406;
      ctx.body = {
        error: "User exists"
      }
      return;
    }
  } catch (error) {
    console.log('error', error)
  }
}

export const login = async(ctx:Context, next:Next) => {
  try {
    let user = await getUserFromDb(ctx.request.body.username as string); 
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        message: "bad username"
      }
      return;
    }
    const {
      password,
      ...userInfoWithoutPassword
    } = user;
    if (await bcrypt.compare(ctx.request.body.password,password)) {
      ctx.body = {
        token: jsonwebtoken.sign({
          data: userInfoWithoutPassword,
          //exp in seconds
          exp: Math.floor(Date.now() / 1000) + (60 * 60)*24*15 // 60 seconds * 60 minutes = 1 hour
        }, secret)
      }
      next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: "bad password"
      }
      return;
    }
  } catch (error) {
    console.log('error', error)
  }
}