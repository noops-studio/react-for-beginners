import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from "@reduxjs/toolkit";
import Post from "../models/post/Post";

interface ProfileState {
    posts: Post[]
}

const initialState: ProfileState = {
    posts: []
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
        addOnTop: (state, action: PayloadAction<Post>) => {
            state.posts = [action.payload, ...state.posts]
        },
        add: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload)
        },
        update: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id)
            state.posts[index] = action.payload
        },
        remove: (state, action: PayloadAction<{id: string}>) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id)
            state.posts.splice(index, 1)
        }
    }
})

export const { init, add, update, remove, addOnTop } = profileSlice.actions

export default profileSlice.reducer