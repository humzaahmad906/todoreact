import React from 'react';
import todoStore from '../Stores/mainstore'
import {fabric} from 'fabric';

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

    componentDidMount(){
        this.canvas = new fabric.Canvas('c', {
                height: 600,
                width: 700,
                backgroundColor: 'lightgray'
            }
        );
        this.canvas.on('object:added', (e) => {
            let objectAdded = e.target;
            objectAdded.id = count;
            count++;

        })
        this.canvas.on('mouse:up', (options) => {
            // this.canvas.remove(this.canvas.getActiveObject());
            todoStore.on('OBJECT_REMOVED', ()=>{
            while(true){
            if(this.canvas.getActiveObject().length != 0){
                this.canvas.remove(this.canvas.getActiveObject());
            }
            else{

            }

            }

            })
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
                // top: 40*this.state.item,
                top: 40,
                selectable: true
            }));


            // this.canvas.renderAll();
        });
        todoStore.on('LAYERS_CHANGED',()=>{
            let i, j;
            // console.log(todoStore.index)
            todoStore.index.map((ind, id)=> {

                for (i=0; i<this.canvas.getObjects().length; i++){
                    if(this.canvas.getObjects()[i].id === id){
                        const distance = ind-this.canvas.getObjects()[i].id;
                        console.log(distance)
                        if(distance < 0){
                            for (j =0; j<-distance; j++ ){
                                console.log(this.canvas.getObjects()[i]);
                                // this.canvas.getObjects()[i].set({
                                //     id: ind
                                // })
                                this.canvas.getObjects()[i].sendBackwards();

                            }
                        }
                        else if(distance > 0){
                            for (j =0; j<distance; j++ ){
                                console.log(this.canvas.getObjects()[i]);
                                this.canvas.getObjects()[i].set({
                                    id: ind
                                })
                                this.canvas.getObjects()[i].bringForward();

                            }
                        }
                    }



                }
            })

        })
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