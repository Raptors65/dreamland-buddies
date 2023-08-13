import { configureStore } from "@reduxjs/toolkit";
import creaturesReducer from "./creaturesReducer";

export const store = configureStore({
  reducer: {
    creatures: creaturesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;