import { Context, Next } from "koa";
import { emitBridge as emitBridgeService } from "../../service/powerswap/bridge.service";
import {discord,sendMsg,buildMsg} from '../../bots/discord'

export const emitBridge = async (ctx:Context, next:Next) => {
    try {
        const body = ctx.request.body
        if(!body.txh || !body.chainId){
            throw new Error("parameter error");
        }
        sendMsg(ctx.dcClient,buildMsg({title:"Some one sent bsc to ethw bridge request!"}))
        const res = await emitBridgeService(body.txh as string, body.chainId as string)
        ctx.status = 200;
        if(res){
            ctx.body = {
                msg:"success",
            };
        }
    } catch (error) {
        console.log('error', error)
        ctx.status = 400;
        ctx.body = {
            error: error.message
        }
        return;
    }
}