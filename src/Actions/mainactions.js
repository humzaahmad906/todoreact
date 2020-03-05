import dispatcher from '../dispatcher';
export const eventsAvailable = {
    objectAdded: "ELEMENT_ADDED",
}
export function createTodo(text){
    dispatcher.dispatch({
        type: "ELEMENT_ADDED",
        text
    })
}
