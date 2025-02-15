//import mongoose from "mongoose";
import mongoose from "mongoose";

// Schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: { //default date saves 2024-03-16T14:30:00.000Z 
    type: Date,
    default: () => new Date().toISOString().split('T')[0] 
  }  
});

//inherit CRUD methods from mongoose
const Article = mongoose.model('Article', articleSchema);

export default Article;