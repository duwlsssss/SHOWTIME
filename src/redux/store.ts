import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { createTransform, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import modalReducer from './reducers/modalReducer';
import scheduleReducer from './reducers/scheduleReducer';
import { TSchedule } from '@/types/schedule';
import adminUserIdReducer from './reducers/adminUserIdReducer';
import emplyeeReducer from './reducers/emplyeeReducer';

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
	whitelist: ['user', 'modal', 'schedule', 'emplyee', 'adminSearchUserId'],
	transforms: [dateTransform],
};

const rootReducer = combineReducers({
	user: userReducer,
	modal: modalReducer,
	schedule: scheduleReducer,
	emplyee: emplyeeReducer,
	adminSearchUserId: adminUserIdReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// storage.removeItem('persist:root'); // 가끔 상태 업데이트 안되면 이 부분으로 초기화하기 -> 다시 로그인

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>; //Thunk와 동기 액션 모두 처리 가능
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
