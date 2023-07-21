const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema; 
const ArticleSchema = new Schema({ 
  title: String, 
  content: String, 
  type:String,
  selectedTUser:Array,
  tUsersIds:Array,
  relatedProjects:Array,
  socialMedia:Array
 },{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
 }); 

 ArticleSchema.plugin(mongoosePaginate);

export default mongoose.model('Articles', ArticleSchema);