import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState, AppThunk } from '..';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const postSlice = createSlice({
  name: 'subject',

  initialState: { id: 0, userId: 0, title: '', body: '' } as Post,

  reducers: {
    setPost(state, action) {
      return action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const fetchPost =
  (id: any): AppThunk =>
  async (dispatch) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = (await resp.json()) as Post;

    dispatch(postSlice.actions.setPost(data));
  };

export const selectPost = () => (state: AppState) => {
  return state?.[postSlice.name];
};
