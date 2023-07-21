import Whitelist from '../../models/powerswap/whitelist';
const moment = require('moment-timezone');


export const getWhitelisted = async(address:string) => {
    // let address = addr.toLowerCase()
    console.log('address', address)
    const list = await Whitelist.findOne({"eth":{ $regex: new RegExp("^" + address.toLowerCase(), "i") }})
    return list
}

export const setAptAddress = async(address:string,aptAddress:string) => {
    // let address = addr.toLowerCase()
    const list = await Whitelist.findOne({eth:{ $regex: new RegExp("^" + address.toLowerCase(), "i") }})
    let udatedList
    if(!list){
        throw new Error("ethw address not exists");
    }
    if(!aptAddress || aptAddress.length > 100){
        throw new Error("please make sure your apt address is correct");
    }
    if(list.apt===''){
        udatedList = await Whitelist.updateOne({"eth":{ $regex: new RegExp("^" + address.toLowerCase(), "i") }}, { "apt": aptAddress });
    }else{
        throw new Error("apt address exists");
    }
    
    return udatedList
}

export const importListData = async(addresses:Array<string>,type:string) => {
    const nowUTC = moment.utc();
    const data = addresses.map(addr=>{
        return {
            eth:addr,
            apt:"",
            type,
            updated_at:null,
            created_at:nowUTC,
            deleted_at:null
        }
    })
    const list = await Whitelist.create(data)
    return list
}

export const updateListData = async(addresses:Array<string>) => {
    const data = addresses.map(async addr=>{
        await Whitelist.deleteOne({"eth":{ $regex: new RegExp("^" + addr.toLowerCase(), "i") }});
    })
    return
}