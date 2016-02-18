import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routeReducer } from 'react-router-redux';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState = {}) {

  const reducer = combineReducers(Object.assign({}, rootReducer, {
    routing: routeReducer
  }));

  const store = createStore(reducer, initialState);

  return store;
}
