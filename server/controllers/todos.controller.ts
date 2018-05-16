
import * as TodoService from "../services/todo.service";



export async function getTodos(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var todos = await TodoService.getPaginatedTodos({}, page, limit);
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}


export async function createTodo(req, res, next){

    // Req.Body contains the form submit values.

    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"});
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"});
    }
}

export async function updateTodo(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"});
    }

    var _id = req.body._id;

    console.log(req.body)

    var todo = {
        _id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try{
        var updatedTodo = await TodoService.updateTodo(todo);
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"});
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}


export async function removeTodo(req, res, next){

    var _id = req.params._id;

    try{
        var deleted = await TodoService.deleteTodo(_id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}

