import { PersonAddOutlined, PersonRemoveOutlined, LocationOn } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const PostOwner = ({ userId, firstName, lastName, subtitle, userPicturePath }) => {
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;



    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="40px" />
                <Box
                    onClick={() => {
                        if (_id === userId) {
                            navigate(`/profile/${userId}`);
                        } else {
                            navigate(`/user/${userId}`);
                        }
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
                        {firstName} {lastName}
                    </Typography>
                    <Box display={"flex"}>
                        <Typography color={medium} fontSize="0.75rem">
                            is at &nbsp;
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem" fontWeight={700}>
                            {subtitle}
                        </Typography>
                    </Box>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default PostOwner;
