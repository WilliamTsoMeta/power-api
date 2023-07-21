import FrequencyWords from '../models/frequencyWords'; 
import {Paginate} from '../../types'

export const getListDb = async(paginate:Paginate) => {
    const frequencyWords = await FrequencyWords.paginate({},{limit:paginate.per_page,page:paginate.current_page})
    return frequencyWords
}


export const createUserInDb = async (user:object) => { 
  var newUser = new FrequencyWords(user); 
  newUser.save(); 
return user; }