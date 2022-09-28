const mongoose = require('mongoose');
const slugify = require('slugify') // this for make the id looks good and make sense beside of id like '78836JKHFJKSQDF7'
const marked = require('marked')


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
      },
      markdown: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      slug: {
        type: String,
        required: true,
        unique: true
      }
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    // strict : true to force slugify to get rid of any characters that doesnt fit URL
    this.slug = slugify(this.title, { lower: true, strict: true }) 

  }

  next()
})


module.exports = mongoose.model('Article', articleSchema);