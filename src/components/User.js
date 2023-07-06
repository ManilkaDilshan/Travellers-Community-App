import { PersonAddOutlined, PersonRemoveOutlined, MoveToInboxOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setRequests } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const User = ({ userId, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const requests = useSelector((state) => state.requests);
    const friends = useSelector((state) => state.friends);

    const { palette } = useTheme();
    const main = palette.neutral.main;

    const addFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/friend-requests`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sender: _id, recipient: userId }),

            }
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(setRequests(data));
          } else {
            console.error("Error:", response.status);
          }
    };

    const deleteRequest = async () => {
        const response = await fetch(
            `http://localhost:3001/friend-requests/${sentRequest._id}/decline`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

            }
        );
        if (response.ok) {
            await response.json();
            const updatedRequests = requests.filter(
                (request) => request._id !== sentRequest._id
              );
              dispatch(setRequests(updatedRequests));
          } else {
            console.error("Error:", response.status);
          }
    };

    const acceptRequest = async () => {
        const response = await fetch(
            `http://localhost:3001/friend-requests/${receivedRequest._id}/accept`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

            }
        );
        if (response.ok) {
            const data = await response.json();
            const updatedRequests = requests.filter(
                (request) => request._id !== receivedRequest._id
              );
              dispatch(setRequests(updatedRequests));
              dispatch(setFriends(data.friends));
          } else {
            console.error("Error:", response.status);
          }
    };

    const removeFriends = async () => {
        const response = await fetch(
            `http://localhost:3001/user/${_id}/${userId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

            }
        );
        if (response.ok) {
            await response.json();
            const updatedFriends = friends.filter(
                (friend) => friend._id !== userId
              );
              dispatch(setFriends(updatedFriends));
          } else {
            console.error("Error:", response.status);
          }
    };

    const isFriend = friends.find((friend) => friend._id === userId);
    const sentRequest = requests.find((request) => {
        return (request.sender._id === _id && request.recipient === userId)
    });
    const receivedRequest = requests.find((request) => {
        return (request.sender._id === userId) && (request.recipient === _id);
    });
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={user.picturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/user/${userId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.main,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>
                </Box>
            </FlexBetween>
            {isFriend && <Typography onClick={removeFriends} sx={{
                backgroundColor: palette.warning.main, color: palette.warning.light, p: "0.4rem 0.6rem", borderRadius: "0.6rem", "&:hover": {
                    color: palette.warning.main,
                    backgroundColor: palette.warning.light,
                    cursor: "pointer",
                },
            }}>Remove Friend</Typography>}
            {sentRequest && <Typography onClick={deleteRequest} sx={{
                backgroundColor: palette.danger.main, color: palette.danger.light, p: "0.4rem 0.6rem", borderRadius: "0.6rem", "&:hover": {
                    color: palette.danger.main,
                    backgroundColor: palette.danger.light,
                    cursor: "pointer",
                },
            }}>Delete Request</Typography>}
            {receivedRequest && <Typography onClick={acceptRequest} sx={{
                backgroundColor: palette.success.main, color: palette.success.light, p: "0.4rem 0.6rem", borderRadius: "0.6rem", "&:hover": {
                    color: palette.success.main,
                    backgroundColor: palette.success.light,
                    cursor: "pointer",
                },
            }}>Accept Request</Typography>}
            {(!receivedRequest && !sentRequest && !isFriend) &&
                <Typography onClick={addFriend} sx={{
                    backgroundColor: palette.primary.main, color: palette.primary.light, p: "0.4rem 0.6rem", borderRadius: "0.6rem", "&:hover": {
                        color: palette.primary.main,
                        backgroundColor: palette.primary.light,
                        cursor: "pointer",
                    },
                }}>Add Friend</Typography>
            }
        </FlexBetween>
    );
};

export default User;
