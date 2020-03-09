import React from 'react';
import todoStore from '../Stores/mainstore'
import {fabric} from 'fabric';
import { sortable } from 'react-sortable';
// import {lightgray} from "color-name";
let count = 0;
class CanvasOperations extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text: "",
            item: 0
        }
    }
    addtext = () => {

    }

    componentDidMount(){
        this.canvas = new fabric.Canvas('c', {
                height: 600,
                width: 700,
                backgroundColor: 'lightgray'
            }
        );
        this.canvas.on('object:added', (e) => {
            let objectAdded = e.target;


        })
        this.canvas.on('mouse:up', (options) => {
            this.canvas.remove(this.canvas.getActiveObject());
            // todoStore.on('OBJECT_REMOVED', ()=>{
            // while(true){
            // if(this.canvas.getActiveObject().length != 0){
            //     this.canvas.remove(this.canvas.getActiveObject());
            // }
            // else{
            //
            // }

            // }

            // })
        });

        todoStore.on('TASK_ADDED',()=>{
            let dummyText = "";

            this.setState({
                text: todoStore.todoText,
                item: this.state.item + 1

            })

            this.canvas.add(new fabric.Text(todoStore.todoText, {
                fontFamily: 'Delicious_500',
                left: 100,
                top: 40*this.state.item,
                selectable: false
            }));


            // this.canvas.renderAll();
        });
        todoStore.on('TASK_REMOVED', ()=>{
            this.canvas.getObjects().forEach(
                element => {
                    element.set("selectable", true);
                }
            )
            // let i;
            // for(i = 0; i < this.canvas.getActiveObject().length; i++){
            //     this.canvas.getActiveObject()[i].set({
            //         selectable: true
            //
            //     })
            //     console.log(this.canvas.getActiveObject()[i].selectable);
            //
            // }

        })


    }

    render(){
        return(
            <canvas id = 'c'></canvas>
        )
    }
}
export default CanvasOperations;