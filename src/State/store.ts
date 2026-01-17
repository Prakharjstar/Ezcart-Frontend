import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const dummySlice = createSlice({
  name: "dummy",
  initialState: {},
  reducers: {},
});

const rootReducer = combineReducers({
  dummy: dummySlice.reducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
