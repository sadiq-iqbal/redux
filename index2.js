const redux = require('redux');
const createStore = redux.createStore;

// ACTIONS 
const Actions = {
    BUY_CAKE: 'BUY_CAKE',
    BUY_ICECREAM: 'BUY_ICECREAM',
    INCREMENT_CAKE: 'INCREMENT_CAKE',
    INCREMENT_ICECREAM: 'INCREMENT_ICECREAM'
}

// ACTION CREATOR
const buyCake = () => {
    return {
        type: Actions.BUY_CAKE
    }
}

const buyIceCream = () => {
    return {
        type: Actions.BUY_ICECREAM
    }
}

const incrementCake = () => {
    return {
        type: Actions.INCREMENT_CAKE
    }
}

const incrementIceCream = () => {
    return {
        type: Actions.INCREMENT_ICECREAM
    }
}

const initialState = {
    numberOfCakes: 10,
    numberOfIceCreams: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }


        case Actions.BUY_ICECREAM:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }

        case Actions.INCREMENT_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + 1
            }

        case Actions.INCREMENT_ICECREAM:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + 1
            }
        default:
            return state
    }

}
const store = createStore(reducer);
console.log("initial state", store.getState());
const unSubscribe = store.subscribe(() => {
    console.log("updated state", store.getState());
})

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unSubscribe();

