import React from "react";

class Item extends React.Component {
    render() {
        return (
            <li {...this.props}>
                {this.props.children}
            </li>
        )
    }
}


let SortableItem = sortable(Item);

class SortableList extends React.Component {

    state = {
        items: this.props.items
    };

    onSortItems = (items) => {
        this.setState({
            items: items
        });
    }

    render() {
        const { items } = this.state;
        let listItems = items.map((item, i) => {
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