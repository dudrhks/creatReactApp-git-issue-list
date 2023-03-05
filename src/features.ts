import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  state: string;
  comments: number;
  number: number;
  title: string;
  created_at: string;
}

export interface ListState {
  issueList: Issue[];
}

const initialState: ListState = {
  issueList: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    loadList: (state, action: PayloadAction<Issue[]>) => {
      state.issueList = action.payload.sort((a, b) => b.comments - a.comments);
    },
  },
});

export const { loadList } = listSlice.actions;

export default listSlice.reducer;
