import { configureStore, combineReducers } from "@reduxjs/toolkit";
import users from "./users";

const rootReducer = combineReducers({
  users: users.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
