const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const NFTWhitelistSchema = new Schema({ 
  eth: String, 
  apt:String,
  type:String,
  updated_at: Date,
  created_at: Date,
  deleted_at: Date,
 },{bufferTimeoutMS: 60000}); 
 
export default mongoose.model('nft-airdrop', NFTWhitelistSchema);