const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles');
const app = express()

app.use('/articles',articleRouter)
app.set('view engine', 'ejs')
app.get("/", (req, res)=> {
    const articles = [{
        title: 'article 1',
        createdAt: new Date(),
        description : 'test'
    },
    {
        title: 'article 2',
        createdAt: new Date(),
        description : 'desblablalblsdfsdfcriptiondesblablalblsdfsdfcription desblablalblsdfsdfcriptiondesblablalblsdfsdfcription'
    }]

    res.render("articles/index", {articles: articles})
})


app.listen(5000,() => { console.log("listening on 5000")})