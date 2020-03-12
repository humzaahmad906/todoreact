// "use strict"
import React from "react";
import { sortable } from 'react-sortable'
import CanvasOperations from '../Canvas/maincanvas'
import todoStore from '../Stores/mainstore';
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";import dispatcher from "../dispatcher";
Sortable.mount(new MultiDrag(), new Swap());

class Item extends React.Component {
    render() {
        return (
            <li {...this.props}>
                {this.props.children}
            </li>
        )
    }
}





var SortableItem = sortable(Item);

class SortableList extends React.Component{
    constructor(props){

        super(props);
        this.allItems = [];
        this.originalItems = [];
        this.newIndex = [];
        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        todoStore.on('ADDED_ELEMENTS',()=>{
            this.setState({
                items: todoStore.sortedElement
            })
            console.log(this.state.items);

        })
        // todoStore.on('TASK_ADDED', () => {
        //     this.allItems.push(todoStore.todoText);
        //     this.originalItems.push(todoStore.todoText);
        //     // console.log(this.originalItems)
        //     this.setState({
        //         items: this.allItems
        //     })
        //
        // })
    }

    // positionReturn = (org, mod) => {
    //
    //     console.log("org", org)
    //     console.log("mod",mod)
    //     let i,j;
    //     this.newIndex = [];
    //     for(i=0; i< org.length; i++){
    //         for(j=0; j<mod.length; j++){
    //             if(org[i] == mod[j]){
    //                 this.newIndex.push(j)
    //             }
    //         }
    //     }
    // }
    // let counter = 0;
    onSortItems = (items) => {
        console.log("modified items",items);
        // console.log("original items",this.state.items);
        dispatcher.dispatch({
            type: 'LIST_SORTED',
            data:items
        })
        // this.positionReturn(this.state.items, items);
        //
        // dispatcher.dispatch({
        //     type: 'CHANGE_LAYERS',
        //     data: {
        //         index: this.newIndex
        //     }
        // })
        // console.log(this.newIndex);
        //


        // console.log(this.newIndex)
        this.setState({
            items: items
        });
    }
    // nice = () => {
    //     console.log(this.id)
    //     dispatcher.dispatch({
    //         type: 'OBJECT_MOVED',
    //         data: {
    //             key: this.key
    //         }
    //     })
    // }

    render() {
        // let items  = this.state.items;
        // let its = items.map((item)=>{
        //     return item.id
        // })
        // console.log(its)
        // <ReactSortable
        // list={its}
        // setList={(newitems)=>{this.onSortItems(newitems)}}
        // />
        let items = this.state.items
        let listItems = items.map((item, i) => {
            return (
                <SortableItem
                    key={item.id}
                    onSortItems={this.onSortItems}
                    items={items}
                    sortId={i}>{item.text}</SortableItem>
            );
        });


        return (
            <ul className='sortable-list'>
                {listItems}
            </ul>
        )

    }
};
export default SortableList;

// class SortableList extends React.Component {
//
//     state = {
//         items: this.props.items
//     };
//
//     onSortItems = (items) => {
//         this.setState({
//             items: items
//         });
//     }
//
//     render() {
//         const { items } = this.state;
//         let listItems = items.map((item, i) => {
//             return (
//                 <SortableItem
//                     key={i}
//                     onSortItems={this.onSortItems}
//                     items={items}
//                     sortId={i}>{item}</SortableItem>
//             );
//         });
//
//         return (
//             <ul className='sortable-list'>
//                 {listItems}
//             </ul>
//         )
//     }
// };