import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { Link } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.friends);

    const getFriends = async () => {
        const response = await fetch(
            `http://localhost:3001/user/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.ok) {
            const data = await response.json();
            dispatch(setFriends(data));
          } else {
            console.error("Error:", response.status);
          }
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                >
                    Friend List
                </Typography>
                <Link to={`/users/${userId}`} style={{ textDecoration: "none" }}><Typography color={palette.primary.main}>All Users</Typography></Link>
            </FlexBetween>
            <Box display="flex" flexDirection="column" gap="1.5rem" sx={{ mt: "1.5rem" }}>


                {friends.length === 0 ? 'No Friends' : friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
