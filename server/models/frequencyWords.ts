const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const UserSchema = new Schema({ 
  word: String, 
 }); 
 
export default mongoose.model('frequency_words', UserSchema);