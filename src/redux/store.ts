import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import scheduleReducer from './reducers/scheduleReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
	schedule: scheduleReducer,
	user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>; //Thunk와 동기 액션 모두 처리 가능
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export default store;
