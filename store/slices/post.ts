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
  name: 'post',
  initialState: {
    detail: { id: 0, userId: 0, title: '', body: '' } as Post,
    list: [] as Post[],
  },
  reducers: {
    setPost(state, action) {
      state.detail = action.payload;
    },
    setPosts(state, action) {
      state.list = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);
      if (!action.payload.post) {
        return state;
      }
      return {
        ...state,
        ...action.payload.post,
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

export const fetchPosts = (): AppThunk => async (dispatch) => {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = (await resp.json()) as Post[];

  dispatch(postSlice.actions.setPosts(data));
};

export const selectPost = () => (state: AppState) => {
  return state?.[postSlice.name].detail;
};

export const selectPosts = () => (state: AppState) => {
  return state?.[postSlice.name].list;
};
