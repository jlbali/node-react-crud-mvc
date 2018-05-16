import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';


var ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

ToDoSchema.plugin(mongoosePaginate);
const ToDo = mongoose.model('Todo', ToDoSchema);

export default ToDo;
