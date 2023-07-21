import { Context, Next } from "koa";
import frequencyWords from "../models/articles";
import { getListDb } from "../service/frequencyWords.service";


export const getList = async (ctx:Context, next:Next) => {
    try {
        const query = ctx.request.query
        console.log('query', query)
        const articles = await getListDb({ 
            per_page:parseInt(query.per_page as string),
            current_page:parseInt(query.current_page as string)
        })
        ctx.status = 200;
        ctx.body = articles.docs;
    } catch (error) {
        console.log('error---', error)
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}