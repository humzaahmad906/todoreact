import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
// import * as TodoActions from  '../Actions/mainactions';
class TodoStore extends EventEmitter{
    constructor(props){
        super(props);
        this.todoList = []


    }
    createTodo(text){
        // this.todoElement.text = text;
        // this.todoElement.id = Date.now();
        // this.todoList.push(this.todoElement);
        // this.todoElement.text = "";
        // this.todoElement.id = null;
        this.todoList.push(text);
        this.emit('NEW_ADDED');
    }
    handleAction = (action) => {

        switch(action.type){
            case 'ADD_NEW':
                this.createTodo(action.data.text);
                break;
            default:
                console.log(action.type);
        }
    }
}
const todoStore = new TodoStore();
dispatcher.register(todoStore.handleAction);
export default todoStore;