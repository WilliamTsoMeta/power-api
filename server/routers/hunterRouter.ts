import * as Router from 'koa-router';
import { getArticleList } from '../controllers/articles.controller';
import {getList as getFrequencyWords} from "../controllers/frequencyWords.controller"
const router = new Router();
const { login,register } = require("../controllers/users.controller");
const {addArticle} = require("../controllers/articles.controller")



router.get('/', async(ctx) => {
  ctx.body = 'Hello';
})


/**
 * You can login with:
 * curl -X POST -H "Content-Type: application/json" --data '{"username":"thedude", "password":"abides"}' http://localhost:9000/public/login
 */
 router.post('/public/login', login);

/**
 * You can register with:
 * curl -X POST --data '{"username":"thedude", "password":"abides", "email":"thedude@slacker.com", "name":"Mr. Lebowski"}' http://localhost:9000/public/register
 */
 router.post('/public/register', register);

/**
 * After you login and get a token you can access
 * this (and any other non public endpoint) with:
 * curl -X GET -H "Authorization: Bearer INSERT_TOKEN_HERE" http://localhost:9000/sacred
 */
 router.get('/api/v1', async(ctx) => {
  console.log('ctx.state', ctx.state)
  ctx.body = 'Hello ' + ctx.state
});

router.get('/api/v1/frequency_words',getFrequencyWords)
router.post('/api/v1/articles',addArticle)
router.get('/api/v1/articles',getArticleList)


export default router