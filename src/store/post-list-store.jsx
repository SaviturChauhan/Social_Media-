import { useCallback } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPosts: () => {},
});

const postListReducer = (currpostList, action) => {
  let newPostList = currpostList;
  if (action.type == "DELETE_POST") {
    newPostList = currpostList.filter(
      (post) => post.id !== action.payload.postID
    );
  } else if (action.type == "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type == "ADD_POST") {
    newPostList = [action.payload, ...currpostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userID, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      //yeah saari cheezien jayengi reducer ke pass
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userID: userID,
        tags: tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      //yeah saari cheezien jayengi reducer ke pass
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = useCallback(
    (postID) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postID,
        },
      });
    },
    [dispatchPostList]
  );

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, addInitialPosts }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
