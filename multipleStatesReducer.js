const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const cakeInitialState = {
    numberOfCakes: 10,
}

const iceCreamInitialState = {
    numberOfIceCreams: 10
}

const actions = {
    BUY_CAKE: "BUY_CAKE",
    BUY_ICE_CREAM: "BUY_ICE_CREAM"
}



const getCake = () => {
    return {
        type: actions.BUY_CAKE
    }
}

const getIceCream = () => {
    return {
        type: actions.BUY_ICE_CREAM
    }
}

const cakeReducer = (state = cakeInitialState, action) => {
    switch (action.type) {
        case actions.BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action) => {
    switch (action.type) {
        case actions.BUY_ICE_CREAM:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer);
console.log('initial state', store.getState());
const unSubscribe = store.subscribe(() => {
    console.log(rootReducer);
    console.log(store)
    console.log("updated state", store.getState());
})

store.dispatch(getCake());
store.dispatch(getCake());
store.dispatch(getCake());
store.dispatch(getIceCream());
store.dispatch(getIceCream());
console.log('iceCream state : ', store.getState().iceCream);
unSubscribe()

