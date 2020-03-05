import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import todoStore from '../Stores/mainstore'
import * as TodoActions from  '../Actions/mainactions';


class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {todo: todoStore,
                        text: ""}

    }
    componentWillMount() {
        todoStore.on(TodoActions.eventsAvailable.objectAdded, () => {
            let dummy = this.getText();
            console.log(dummy);
            let dummyId = Date.now();

            todoStore.todoList.push({
                text: dummy,
                id: dummyId
            });
            const listItems = todoStore.todoList.map((item) =>
                <li key = {item.id}>{item.text}</li>
            );
        })

    }
    createTodo = () => {

        todoStore.createTodo(this.state.text);
        this.setState({
            text:  this.state.text
        })

    }
    textUpdate = (e) => {
        this.setState({
            text:  e.target.value
        })

    }
    getText = () => {
        return this.state.text
    }

    render(){

        const listItems = todoStore.todoList.map((item) =>
            <li key = {item.id}>{item.text}</li>
        );
        // console.log(this.todos.text);
        return (
        <div className='row'>
            <div className='col-6'>
                <div className='row'>
                    <div className='col'>
                        {listItems}
                    </div>
                    <div className='col'>
                    <textarea id = 'text' rows = "4" onChange = {this.textUpdate} placeholder="Enter Task Here">

                    </textarea>
                    <Button onClick = {this.createTodo} className = 'm-auto'>
                        Add
                    </Button>
                    </div>
                </div>

            </div>
        </div>

        );

    }
}

export default TodoList;