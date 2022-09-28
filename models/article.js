const mongoose = require('mongoose');
const slugify = require('slugify') // this for make the id looks good and make sense beside of id like '78836JKHFJKSQDF7'
const marked = require('marked')
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)


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
      },
      cleanHtml: {
        type: String,
        required: true
      }
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    // strict : true to force slugify to get rid of any characters that doesnt fit URL
    this.slug = slugify(this.title, { lower: true, strict: true }) 

  }

  if (this.markdown){
    this.cleanHtml = dompurify.sanitize(marked.parse(this.markdown))
  }

  next()
})


module.exports = mongoose.model('Article', articleSchema);