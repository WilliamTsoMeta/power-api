import { Context, Next } from "koa";
const nfts =  require('../../data/_metadata.json')
const nftsApt = require('../../data/_metadataApt.json')
export const queryAddress = async (ctx: Context, next: Next) => {
  try {
    const query = ctx.request.query;
    const getNFTMeta = query.getNFTMeta;
    const type = query.type
    let data
    let meta = nfts
    // let testid = ['3771','3772','3773','3774','3775']
    ctx.status = 200;
    if (!!getNFTMeta) {
      if(type === 'apt'){
        meta = nftsApt
      }
      data = meta.filter((nft:any) => nft.tokenId === getNFTMeta)[0]
      ctx.body = data
    } else {
      ctx.body = {
        msg: "token error",
      };
    }
  } catch (error) {
    console.log("error getNFTMeta", error);
    ctx.status = 400;
    ctx.body = {
      error: error,
    };
    return;
  }
};
