import { Context, Next } from "koa";
import { getWhitelisted,setAptAddress, importListData, updateListData } from "../../service/powerswap/whitelist.service";
const datasetApt = require("../../../scripts/random_res/apt.json")
const datasetEth = require("../../../scripts/random_res/eth.json")

export const queryAddress = async (ctx:Context, next:Next) => {
    try {
        const query = ctx.request.query
        const res = await getWhitelisted(query.address as string)
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
        console.log('error whitelist', error)
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}

export const setApt = async (ctx:Context, next:Next) => {
    try {
        const body = ctx.request.body
        if(!body.address || !body.apt){
            throw new Error("parameter error");
        }
        const res = await setAptAddress(body.address as string, body.apt as string)
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

export const importWhiteListCon = async (ctx:Context, next:Next) => {
    try {
        // const resApt = await importListData(datasetApt,'apt')
        const resEth = await importListData(datasetEth,'eth')
        if(/* resApt && */ resEth){
            ctx.status = 200;
            ctx.body = {
                msg:"success"
            };
        }else{
            ctx.status = 200;
            ctx.body = {
                msg:"failed",
                res:[/* resApt, */resEth]
            };
        }
        
    } catch (error) {
        console.log('error whitelist', error)
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}

export const updateType = async (ctx:Context, next:Next) => {
    try {
        const query = ctx.request.query
        const res = await updateListData(datasetApt)
        ctx.status = 200;

        ctx.body = {
            msg:"success",
            data:res
        };
        
        
        console.log('res', res)
    } catch (error) {
        console.log('error update', error)
        ctx.status = 400;
        ctx.body = {
            error: error
        }
        return;
    }
}