import React from "react";
import todoStore from '../Stores/mainstore'
import { sortable } from 'react-sortable';
import dispatcher from "../dispatcher";
let counter = 0;

class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: null,

        }
    }
    componentDidMount() {
        todoStore.on('TASK_ADDED',()=>{
            ;
            this.setState({
                item: todoStore.todoText
            })

        })
    }

    render() {
        return (
            <li {...this.props}>
                {this.props.children}
            </li>
        )
    }
}
// let count = 0;

let SortableItem = sortable(Item);
class SortableList extends React.Component {
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
        todoStore.on('TASK_ADDED', () => {
            this.allItems.push(todoStore.todoText);
            this.originalItems.push(todoStore.todoText);
            // console.log(this.originalItems)
            this.setState({
                items: this.allItems
            })

        })
    }

    onSortItems = (items) => {
        console.log(items);
        let newIndex = [];
        let i, j;
        for(i = 0; i < items.length; i++){
            for(j = 0; j < items.length; j++){
                if(this.originalItems[i] === items[j]){
                    this.newIndex.push(j);
                    // console.log(j);
                    break;
                }
            }
        }
        dispatcher.dispatch({
            type: 'CHANGE_LAYERS',
            data: {
                index: this.newIndex
            }
        })



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
        let items  = this.state.items;
        // console.log(items)
        let listItems = items.map((item, i) => {
            // if (counter === 0){
            //     this.originalcount =
            // }
            return (
                <SortableItem
                    key={i}
                    onSortItems={this.onSortItems}
                    items={items}
                    sortId={i}>{item}</SortableItem>
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