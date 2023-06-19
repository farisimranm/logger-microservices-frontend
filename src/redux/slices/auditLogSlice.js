import { createSlice } from '@reduxjs/toolkit'

export const auditLogSlice = createSlice({
  name: 'auditLog',
  initialState: {
    value: [],
    apiParam: {
      searchCriteriaList: []
    },
    pagination: {
      pageNumber:  0,
      pageSize:  0,
      totalElements:  0,
      totalPages:  0
    }
  },
  reducers: {
    insertAuditLogs: (state, action) => {
      state.value = action.payload
    },
    insertApiParam: (state, action) => {
      state.apiParam = action.payload
    },
    insertPagination: (state, action) => {
      state.pagination = action.payload
    }
  },
})

export const { insertAuditLogs, insertApiParam, insertPagination } = auditLogSlice.actions;

export default auditLogSlice.reducer;