import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authUser";
import roleReducer from "./role";
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
import permissionsReducer from './permissions';
import teamMembersReducer from './teamMember';
import agentsReducer from "./agentSlice";
import propertiesReducer from "./PropertySlice";
// const persistConfig = {
//   key: 'root', // Key for storage
//   storage, // Use localStorage
//   whitelist: ['user'], // Only persist the `user` slice
// };
// const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: userReducer ,
    roles: roleReducer,
    permissions: permissionsReducer,
    teamMembers: teamMembersReducer,
    agents: agentsReducer,
    properties: propertiesReducer,
  },
  // Add other reducers if needed
});

// Create the persistor
// export const persistor = persistStore(store);

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
