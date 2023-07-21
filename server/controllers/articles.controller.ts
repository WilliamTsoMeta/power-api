import { Context, Next } from "koa";
import articles from "../models/articles";
import { createArticleInDb,getArticleListDb } from "../service/article.service";
import {discord,sendMsg,buildMsg} from '../bots/discord'
import {Msg} from '../../types'
export const addArticle = async(ctx:Context, next:Next) => {
    try {
        const msg:Msg = await createArticleInDb(ctx.request.body) as Msg
        console.log('msg', msg)        
        // sendMsg(ctx.dcClient,buildMsg({title:msg.title}))
        ctx.status = 200;
        ctx.body = {
            message: "success"
        };
        next();
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}

export const getArticleList = async (ctx:Context, next:Next) => {
    try {
        // console.log('ctx.request', ctx.request.query)
        const query = ctx.request.query
        const articles = await getArticleListDb({ 
            per_page:parseInt(query.per_page as string),
            current_page:parseInt(query.current_page as string)
        })
        ctx.status = 200;
        ctx.body = articles.docs;
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}