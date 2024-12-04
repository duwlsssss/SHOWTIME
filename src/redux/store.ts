import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { createTransform, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import scheduleReducer from './reducers/scheduleReducer';
import userReducer from './reducers/userReducer';
import { TSchedule } from '@/types/schedule';

const dateTransform = createTransform(
	null, // 저장 시 자동으로 문자열로 변환됨
	(state) => ({
		...(state ?? {}),
		selectedDate: new Date((state as { selectedDate: string }).selectedDate),
		schedules: (state as { schedules?: TSchedule[] })?.schedules?.map((schedule) => ({
			...schedule,
			start_date_time: new Date(schedule.start_date_time),
			created_at: new Date(schedule.created_at),
			repeat_end_date: schedule.repeat_end_date ? new Date(schedule.repeat_end_date) : undefined,
		})),
	}),
	{ whitelist: ['schedule'] },
);

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'schedule'],
	transforms: [dateTransform],
};

const rootReducer = combineReducers({
	schedule: scheduleReducer,
	user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>; //Thunk와 동기 액션 모두 처리 가능
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
