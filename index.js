const redux = require('redux');
const createStore = redux.createStore;

//*redux consist of the following three main parts
//* 1. state  state holds the state of the application in the form of an object
//* 2. action   action is an object that describes what happened
//* 3. reducer   reducer is a function that updates state according to action

//? we can not directly change the state in redux because it is immutable , so we have to emit and action to let the redux store know that state has been changed

//! action 
//? in terms of redux an action is an object that consist of type property and optional payload property 
//? actions dispatched to let the redux store what to do with the state

// creating an action
const ACT_CONST = {
    BUY_CAKE: "BUY_CAKE",
}

const actionObj = {
    type: ACT_CONST.BUY_CAKE,
    // WE CAN HAVE AS MANY OPTIONAL PROPERTIES AS WE WANT BUT NORMALLY WE ONLY ARE GONNA NEED PAYLOAD
    payload: 1
}

//? BUT WE NORMALLY RETURN AN ACTION OBJECT FROM A FUNCTION CALLING IT AN ACTION CREATOR
//? we can even pass it directly without creating a function for it but action creator make it easier to manage and we can easily add new properties or modify existing ones without having to go to each property and modify it 
//? we do it to make it moduler and easier to test  

function buyCake() {
    return {
        type: ACT_CONST.BUY_CAKE,
        payload: 1
    }
}
//! its reason will be explain later down the line

//? reducer 
//? reducer is a function that takes current state and action as arguments and returns a new state
//? reducer is a pure function that only depends on the current state and action
//? the previous states give access to the state and the action is anything in the dispatch function 


const initialState = {
    numberOfCakes: 10
}

//* state in redux should be property of an object in redux.

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ACT_CONST.BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1,
            }
        default:
            return state

    }
}

//Redux Store One store for the entire application Responsibilities \
//- ➤Holds application state
// ➤ Allows access to state via getState()
// ➤Allows state to be updated via dispatch(action)
// ➤ Registers listeners via subscribe(listener)
// ➤Handles unregistering of listeners via the function returned by subscribe (listener)


//? store
const store = createStore(reducer);
console.log("initial state", store.getState());
const unSubscribe = store.subscribe(() => {
    console.log("updated state", store.getState());
    // this run everytime state is updated or an action is dispatched
})

store.dispatch(buyCake());
store.dispatch(buyCake());


// explaination
// you create a store , store that store the initail state of the website
// you create an action creator which is a function that returns an action object // action is an object that describe what happened
// you create a reducer which is a function that takes the current state and action as arguments and returns a new state
// you dispatch an action to the store which is a function that takes an action object as an argument and updates the state
// you subscribe to the store which is a function that takes a function as an argument and returns a function that unsubscribes from the store
// every time you dispatch and action the store will run the reducer and update the state
// every time you subscribe to the store the store will run the reducer and update the state
// the updated state is stored in the store and can be accessed by the getState function
