import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authUser";
import roleReducer from "./role";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import permissionsReducer from './permissions';
const persistConfig = {
  key: 'root', // Key for storage
  storage, // Use localStorage
  whitelist: ['user'], // Only persist the `user` slice
};
const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: persistedReducer,
    roles: roleReducer,
    permissions: permissionsReducer,
  },
  // Add other reducers if needed
});

// Create the persistor
export const persistor = persistStore(store);

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
