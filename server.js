const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles');
const Article = require('./models/article')

const app = express()

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
  })

app.use(express.urlencoded({extended : false})) // this need to come first before routing !!!
app.use('/articles',articleRouter)

app.set('view engine', 'ejs')
app.get("/", async (req, res)=> {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render("articles/index", {articles: articles})
})


app.listen(5000,() => { console.log("listening on 5000")})