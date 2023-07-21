import { Context, Next } from "koa";
import { getAirdropAddress, addAirdropAddress as addAirdropAddressService } from "../../service/powerswap/airdrop.service";

export const queryAirdropAddress = async (ctx:Context, next:Next) => {
    try {
        const query = ctx.request.query
        const res = await getAirdropAddress(query.address as string)
        ctx.status = 200;
        if(res){
            ctx.body = {
                msg:"success",
                data:res
            };
        }else{
            ctx.body = {
                msg:"empty"
            }
        }
        
        console.log('res', res)
    } catch (error) {
        console.log('error airdrop address', error)
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}

export const addAirdropAddress = async (ctx:Context, next:Next) => {
    try {
        const body = ctx.request.body
        if(!body.address){
            throw new Error("parameter error");
        }
        const res = await addAirdropAddressService(body.address as string)
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