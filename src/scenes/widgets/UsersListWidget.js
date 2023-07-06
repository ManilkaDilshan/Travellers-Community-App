import { Box, Typography, useTheme } from "@mui/material";
import User from "components/User";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersListWidget = ({ userId }) => {
    const [users, setUsers] = useState([]);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);

    const getUsers = async () => {
        const response = await fetch(
            `http://localhost:3001/user/${userId}/allUsers`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setUsers(data);
          } else {
            console.error("Error:", response.status);
          }
    };

    useEffect(() => {
        getUsers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                >
                    All Users
                </Typography>
            </FlexBetween>
            <Box display="flex" flexDirection="column" gap="1.5rem" sx={{ mt: "1.5rem" }}>
                {users.length === 0 ? 'No Users' : users.map((user) => (
                    <User
                        key={user._id}
                        userId={user._id}
                        user={user}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default UsersListWidget;
