const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

// Initial state
const initialState = {
    loading: false,
    users: [],
    error: ''
};

// Action types
const ACTIONS = {
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE'
};

// Action creators
const fetchUsers = () => ({
    type: ACTIONS.FETCH_USERS
});

const fetchUsersSuccess = (users) => ({
    type: ACTIONS.FETCH_USERS_SUCCESS,
    payload: users
});

const fetchUsersFailure = (error) => ({
    type: ACTIONS.FETCH_USERS_FAILURE,
    payload: error
});

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_USERS:
            return { ...state, loading: true };
        case ACTIONS.FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: '' };
        case ACTIONS.FETCH_USERS_FAILURE:
            return { ...state, loading: false, users: [], error: action.payload };
        default:
            return state;
    }
};

// Thunk action to fetch users
const fetchUsersThunk = () => {
    return (dispatch) => {
        dispatch(fetchUsers());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.name);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            });
    };
};

// Create store and apply middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// Subscribe to store
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch thunk action
store.dispatch(fetchUsersThunk());

// Unsubscribe (optional in this demo)
unsubscribe();
