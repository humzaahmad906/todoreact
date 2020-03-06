import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import todoStore from '../Stores/mainstore'
import * as TodoActions from  '../Actions/mainactions';
import dispatcher from "../dispatcher";


class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {todoList: [],
                        text: ""}

    }
    componentDidMount() {
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
        todoStore.on('NEW_ADDED',()=>{
            const itemsList = todoStore.todoList;
            this.setState({
                todoList:itemsList,
                text:'',
            });
        })
    }
    createTodo = () => {
        dispatcher.dispatch({
            type:'ADD_NEW',
            data:{
                text:this.state.text
            }
        });

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

        const listItems = this.state.todoList.map((item,index) =>
            <li className='text-dark border-danger' key = {index}>{item}</li>
        );
        // console.log(this.todos.text);
        return (
        <div className='row'>
            <div className='col-5 text-left mx-3'>
                {listItems}
            </div>
            <div className='col-5 justify-content-left bg-gray' >
                <textarea id = 'text' rows = "4" onChange = {this.textUpdate} placeholder="Enter Task Here">

                </textarea>
                <Button onClick = {this.createTodo} className = 'py-0 b-0'>
                    Add
                </Button>
            </div>

        </div>

        );

    }
}

export default TodoList;