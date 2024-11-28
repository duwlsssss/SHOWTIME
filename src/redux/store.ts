import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import scheduleReducer from './reducers/scheduleReducer';

const rootReducer = combineReducers({
	schedule: scheduleReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk as any));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
