const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    task : {type:String,required:true},
    completed:{type:Boolean,required:true}
})

const Todo = mongoose.model("Todo",TodoSchema);
module.exports = Todo;