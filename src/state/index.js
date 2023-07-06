import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    requests: [],
    friends: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.posts = [];
            state.friends = [];
            state.requests = []
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },

        removeFriends: (state, action) => {
            const updatedFriends = state.friends.filter(
                (friend) => friend._id !== action.payload
            );
            state.friends = updatedFriends;
        },
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        removePosts: (state, action) => {
            const updatedPosts = state.posts.filter(
                (post) => post.user !== action.payload
            );
            state.posts = updatedPosts;
        },

    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setRequests, removeFriends, removePosts } =
    authSlice.actions;
export default authSlice.reducer;
