import React from 'react';
import todoStore from '../Stores/mainstore'
import {fabric} from 'fabric';
import { uuid } from 'uuidv4';
import {EventEmitter} from 'events';
import dispatcher from "../dispatcher";

// import {lightgray} from "color-name";
let count = 0;
let i;
class CanvasOperations extends React.Component{
    constructor(props){
        super(props);
        // this.emitter = new EventEmitter();
        this.arr = [];

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
        window.Canvas = this.canvas;
        this.canvas.on('object:added', (e) => {
            let objectAdded = e.target;
            setTimeout(function() {
                dispatcher.dispatch(
                    {
                        type: 'ADDED_ELEMENT',
                        data: {
                            id: objectAdded.id,
                            text: objectAdded.text,


                        }
                    }
                );
            }, 1);
            // dispatcher.dispatch()

        })

        // this.canvas.on('mouse:up', (options) => {
        //     // this.canvas.remove(this.canvas.getActiveObject());
        //     todoStore.on('OBJECT_REMOVED', ()=>{
        //     while(true){
        //     if(this.canvas.getActiveObject().length != 0){
        //         this.canvas.remove(this.canvas.getActiveObject());
        //     }
        //     else{
        //
        //     }
        //
        //     }
        //
        //     })
        // });

        todoStore.on('TASK_ADDED',()=>{
            // let dummyText = "";
            const items = ['red' , 'green' , 'blue'];
            this.canvas.add(new fabric.Text(todoStore.todoText, {
                fontFamily: 'Delicious_500',
                left: 100,
                // top: 40*this.state.item,
                top: 40,
                fill:items[Math.floor(Math.random() * items.length)],
                id:uuid(),
                selectable: true
            }));
            // dispatcher.dispatch(({
            //     type: 'ELEMENT_ADDED',
            //     data: {
            //         id:
            //     }
            // }))


            // this.canvas.renderAll();
        });
        todoStore.on('RE_SORTED', ()=>{
            for(i=0; i<this.canvas.getObjects().length; i++){
                this.canvas.getObjects()[i].text = todoStore.sortedElement[i]['text'];
            }

        })
        todoStore.on('LAYERS_CHANGED',()=>{

            let newState = todoStore.index;
            let prevState = [];
            if(todoStore.prevIndex.length < 1){
                let coun =0
                // let i;

                for(i = 0; i<newState.length; i++){
                    prevState.push(coun);
                    coun++;
                }
            }
            else{prevState = todoStore.prevIndex;}
            console.log(prevState)
            console.log(newState)
            // let i = 0;
            // let objCopy = this.canvas.getObjects();
            // for (i =0; i<this.canvas.getObjects().length; i++){
            //     this.canvas.getObjects()[prevState[i]] = objCopy [i];
            // }
            // objCopy = this.canvas.getObjects();
            // for (i =0; i<this.canvas.getObjects().length; i++){
            //     this.canvas.getObjects()[i] = objCopy [newState[i]];
            // }

            // for(i = 0; i< prevState.length; i++){
            //     this.canvas.getObjects()[i].id = prevState[i];
            // }


            // let distance;
            // let oldState = prevState;
            // let temp
            // // newState.forEach((_, index)=>{
            // //     oldState.push(index);
            // // })
            // // console.log(oldState);
            // let i, j;
            // for(i=0; i<newState.length; i++){
            //
            //     for(j=0; j<oldState.length; j++){
            //         if(oldState[j] === newState[i]){
            //             distance = j - i;
            //
            //             let l;
            //             // let realIndex;
            //             let obj;
            //             for (l=0; l<this.canvas.getObjects().length; l++){
            //                 if(this.canvas.getObjects()[l].id === oldState[j]){
            //                     obj = this.canvas.getObjects()[l];
            //                 }
            //             }
            //             let k;
            //             if (distance < 0){
            //
            //                 for (k=0; k<-distance; k++){
            //                     obj.sendBackwards()
            //                 }
            //             }
            //             else if(distance > 0){
            //                 for (k=0; k<distance; k++){
            //                     obj.bringForward()
            //                 }
            //             }
            //             temp = oldState;
            //             // console.log("at th mid of iteration"+ i)
            //             // console.log(oldState);
            //             let element = oldState[i];
            //             oldState.splice(i, 1);
            //             oldState.splice(j, 0, element);
            //             // oldState[j] = newState[j];
            //             // oldState[i] = temp[j];
            //             //
            //             // let m = 0;
            //             // if (distance > 0){
            //             //     for(m=i; m<j; m++){
            //             //         oldState[m + 1] = temp[m];
            //             //
            //             //     }
            //             // }
            //             // m = 0;
            //             // if (distance < 0) {
            //             //     for (m = j; m < i; m++) {
            //             //         oldState[m] = temp[m+1];
            //             //
            //             //     }
            //             // }
            //             // console.log("at the end of iteration"+ i)
            //             // console.log(oldState);
            //
            //             // let n,o;
            //             // let obj1 = this.canvas.getObjects();
            //             // for (n=0; n<this.canvas.getObjects().length; n++){
            //             //     for (o = 0; o<oldState.length; o++){
            //             //
            //             //         if (obj1[n].id === temp[o]){
            //             //             obj1[n].id = oldState[o];
            //             //         }
            //             //     }
            //             //
            //             //
            //             // }
            //
            //         }
            //     }
            // }

        })
        // todoStore.on('LAYERS_CHANGED',()=>{
        //     let i, j;
        //     // console.log(todoStore.index)
        //     todoStore.index.map((ind, id)=> {
        //
        //         for (i=0; i<this.canvas.getObjects().length; i++){
        //             if(this.canvas.getObjects()[i].id === id){
        //                 const distance = ind-this.canvas.getObjects()[i].id;
        //                 console.log(distance)
        //                 if(distance < 0){
        //                     for (j =0; j<-distance; j++ ){
        //                         console.log(this.canvas.getObjects()[i]);
        //                         // this.canvas.getObjects()[i].set({
        //                         //     id: ind
        //                         // })
        //                         this.canvas.getObjects()[i].sendBackwards();
        //
        //                     }
        //                 }
        //                 else if(distance > 0){
        //                     for (j =0; j<distance; j++ ){
        //                         console.log(this.canvas.getObjects()[i]);
        //                         this.canvas.getObjects()[i].set({
        //                             id: ind
        //                         })
        //                         this.canvas.getObjects()[i].bringForward();
        //
        //                     }
        //                 }
        //             }
        //
        //
        //
        //         }
        //     })
        //
        // })
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