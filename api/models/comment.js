const mongoose =  require('./base');

const CommentSchema = mongoose.Schema({
    comment:String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
