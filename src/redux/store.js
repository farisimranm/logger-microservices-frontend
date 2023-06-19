import { configureStore } from '@reduxjs/toolkit';
import auditLogReducer from './slices/auditLogSlice'
import searchBarReducer from './slices/searchBarSlice'

export default configureStore({
  reducer: {
    auditLog: auditLogReducer,
    searchBar: searchBarReducer,
  },
})