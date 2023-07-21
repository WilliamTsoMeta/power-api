import Article from '../models/articles'; 

// export const getUserFromDb = async (username:string) => { 
//   const data = await User.findOne({username: username}) 
//   return data; 
// }; 

export const createArticleInDb = async (article:object) => { 
    console.log('article', article)
    var newArticle = new Article(article); 
    newArticle.save(); 
    return article;
}
interface Paginate{ 
    per_page:number
    current_page:number
}

export const getArticleListDb = async(paginate:Paginate) => {
    const articles = await Article.paginate({},{limit:paginate.per_page,page:paginate.current_page})
    return articles
}