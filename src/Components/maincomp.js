import React from 'react';
import Button from 'react-bootstrap/Button';
import CanvasOperations from '../Canvas/maincanvas'
import dispatcher from "../dispatcher";
import SortableList from "../Components/layers"


class OperationClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: "",
            removeTrigger: false
        }
        this.objectCount = 0;

    }
    componentDidMount() {
        if (this.state.removeTrigger === true){
            this.objectRemove();
            console.log("wtf man")

        }
    }
    updateLayer = () => {
        let layer = <li>
            {this.objectCount}
                    </li>

    }

    onType = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    getText = () => {
        return this.state.text;
    }
    sendText = () => {
        let textData = this.getText();
        dispatcher.dispatch({
            type: 'TEXT_ADD_TRIGGER',
            data:{
                text: textData
            }
        })
    }
    textRemove=()=>{
        dispatcher.dispatch({
            type: 'REMOVE_TEXT',

        })
        this.setState({
            removeTrigger: true
        })
    }
    objectRemove = () => {

        dispatcher.dispatch({
            type: 'REMOVE_OBJ',

        })
        this.setState({
            removeTrigger: false
        })
    }
    render(){
        // console.log(this.state.removeTrigger)

        return(


            <div className='row'>
                <div className='col'>
                    <div className='row justify-content-center'>
                        <textarea cols = '50' onChange = {this.onType} placeholder = "Enter Task Here"></textarea>
                    </div>
                    <div className='row'>
                        <Button className = "btn-primary btn-block m-auto" onClick = {this.sendText}>Add Task</Button>

                        <Button className = "btn-danger btn-block m-auto" onClick = {this.textRemove}>Remove Task</Button>
                        <SortableList/>
                    </div>

                </div>
                <div className='col'>
                    <CanvasOperations/>
                </div>
            </div>

        )
    }
}
export default OperationClass;