import Airdrop from '../../models/powerswap/airdrop';
const moment = require('moment-timezone');

export const getAirdropAddress = async(address:string) => {
    console.log('address', address)
    const list = await Airdrop.findOne({"eth":{ $regex: new RegExp("^" + address.toLowerCase(), "i") }})
    return list
}

export const addAirdropAddress = async(address:string) => {
    // let address = addr.toLowerCase()
    const list = await Airdrop.findOne({eth:{ $regex: new RegExp("^" + address.toLowerCase(), "i") }})
    if(list){
        throw new Error("address exists");
    }else{
        const nowUTC = moment.utc();
        const airdrop = new Airdrop({
            eth:address,            
            updated_at:null,
            created_at:nowUTC,
            deleted_at:null
        })
        return await airdrop.save()
    }
}