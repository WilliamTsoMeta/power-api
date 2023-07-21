import User from '../models/users'; 

export const getUserFromDb = async (username:string) => { 
  const data = await User.findOne({username: username}) 
  return data; 
}; 

export const createUserInDb = async (user:object) => { 
  var newUser = new User(user); 
  newUser.save(); 
return user; }