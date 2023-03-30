import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  AnyAction,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginSlice from "./features/auth/loginSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: loginSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const reducerProxy = (state: any, action: AnyAction) => {
  if (action.type === "logout/LOGOUT") {
    return persistedReducer(undefined, action);
  }
  return persistedReducer(state, action);
};

const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
