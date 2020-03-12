import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
class TodoStore extends EventEmitter{
    constructor(props){
        super(props);
        this.index = [];
        this.sortedElement = [];
        this.prevIndex = [];
        this.todoText = "";

        // this.removeTrigger = false;


    }
    createTodo(text){
        this.todoText = text;
        // console.log(text)
        // console.log( this.todoText)
        this.emit('TASK_ADDED');
    }
    removeTask =() => {
        this.emit('TASK_REMOVED');
        // this.removeTrigger = true;
        console.log("remove text is triggered")
    }
    removeObject = () => {
        this.emit('OBJECT_REMOVED');

        console.log("object is gonna removed")
    }
    changeLayers = (ind) => {
        this.index = [];
        this.index = ind;
        // console.log(ind)
        // console.log(this.index)
        this.emit('LAYERS_CHANGED');
        this.prevIndex = ind.slice(0, ind.length);

        // console.log(this.index);

    }
    elementAdded = (act) =>{
        this.sortedElement.push(act);
        // console.log(this.sortedElement);
        this.emit('ADDED_ELEMENTS');
    }
    listSorted = (act) => {
        this.sortedElement = act;
        this.emit('RE_SORTED')
    }
    handleAction = (action) => {
        switch(action.type){
            case 'TEXT_ADD_TRIGGER':
                // console.log(action.data.text);
                this.createTodo(action.data.text);
                break;
            case 'REMOVE_TEXT':
                this.removeTask();
                break;
            case 'ADDED_ELEMENT':
                this.elementAdded(action.data);
                break;
            case 'REMOVE_OBJ':
                this.removeObject();
                break;
            case 'LIST_SORTED':
                this.listSorted(action.data);
                break;
            case 'CHANGE_LAYERS':
                this.changeLayers(action.data.index);
                break;
            default:
                console.log(action.type);
        }
    }
}
const todoStore = new TodoStore();
dispatcher.register(todoStore.handleAction);
export default todoStore;