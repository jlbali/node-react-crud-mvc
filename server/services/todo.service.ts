import ToDo from "../models/todo.model";

export async function getQueryTodos(query){
    try{
        var todos = await ToDo.find(query);
        return todos;
    } catch(e){
        console.log("Error! : ", e);
        throw Error("Error al obtener getQueryTodos");
    }
}

export async function getAllTodos(){
    return getQueryTodos({});
}

export async function getPaginatedTodos(query, page, limit){
    var options = {
        page,
        limit
    };
    try{
        var todos = await ToDo.paginate(query, options);
        return todos;
    } catch(e){
        console.log("Error! : ", e);
        throw Error("Error al obtener getPaginatedTodos");
    }
    
}

export async function createTodo(todo){
    var newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    });
    try {
        var savedTodo = await newTodo.save();
        return savedTodo;
    } catch(e){
        console.log("Error! : ", e);
        throw Error("Error al createTodo");
    }
}

export async function updateTodo(todo){
    var _id = todo._id;
    try{
        //Find the old Todo Object by the Id 
        var oldTodo = await ToDo.findById(_id);
    }catch(e){
        console.log("Error! : ", e);
        throw Error("Error occured while Finding the Todo");
    }
    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;
    try {
        var savedTodo = await oldTodo.save();
        return savedTodo;
    } catch(e) {
        console.log("Error! : ", e);
        throw Error("Error al tratar de modificar Todo");
    }
}

export async function deleteTodo(_id){
    
    // Delete the Todo
    try{
        var deleted = await ToDo.remove({_id: _id})
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        console.log("Error! : ", e);
        throw Error("Error Occured while Deleting the Todo")
    }
}

