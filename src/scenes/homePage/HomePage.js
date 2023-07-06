import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRequests } from "state";
import NavBar from 'scenes/navBar/NavBar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from 'scenes/widgets/PostsWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';

function HomePage() {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const getRequests = async () => {
    const response = await fetch(
      `http://localhost:3001/friend-requests/${_id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setRequests(data));
    } else {
      console.error("Error:", response.status);
    }
  };

  useEffect(() => {
    getRequests();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
