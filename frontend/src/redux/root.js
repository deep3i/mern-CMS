import { combineReducers } from "@reduxjs/toolkit";
import { createTransform, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import customerReducer from "./customer/slice";

const authTransform = createTransform(
  (inboundState) => ({
    accessToken: inboundState.accessToken,
  }),
  (outboundState) => ({
    accessToken: outboundState.accessToken,
  }),
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "cms",
  storage,
  whitelist: ["auth"],
  transforms: authTransform
};

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);