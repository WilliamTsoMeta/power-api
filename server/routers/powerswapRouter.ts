import * as Router from 'koa-router';
import {queryAddress,setApt,importWhiteListCon, updateType} from '../controllers/powerswap/whitelist.controller'
import {queryAirdropAddress,addAirdropAddress} from '../controllers/powerswap/airdrop.controller'
import {queryAddress as queryAddressNft} from  '../controllers/powerswap/powerNftAddress.controller'
import {emitBridge} from '../controllers/powerswap/bridge.controller'
const router = new Router();


router.get('/', async(ctx) => {
  ctx.body = 'Hello';
})

router.get('/public/nft_whitelist',queryAddress)
router.post('/public/setapt',setApt)
router.get('/public/nft',queryAddressNft)
router.get('/public/airdrop_list',queryAirdropAddress)
router.post('/public/add_airdrop_address',addAirdropAddress)
// router.post('/emitBridge',emitBridge)

// router.get('/public/import_whitelist',importWhiteListCon)
// router.get('/public/update_white_type',updateType) delete

export default router