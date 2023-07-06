import {
    EditOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    TextField,
    Modal,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath, isProfile = false }) => {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const [location, setLocation] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const medium = palette.neutral.medium;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("location", location);
        if (isProfile) {
            formData.append("isProfile", true);
        }
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const res = await response.json();
        setImage(null);
        setPost("");
        setLocation("");
        setOpen(false)
        const posts = res.posts;
        dispatch(setPosts({ posts }));
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '500px',
        transform: 'translate(-50%, -50%)',
        bgcolor: palette.background.alt,
        borderRadius: "0.75rem",
        boxShadow: 24,
        p: 4,
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1rem">
                <UserImage size="45px" image={picturePath} />
                <InputBase
                    placeholder="Share your trip with others..."
                    readOnly
                    onClick={handleOpen}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.primary.light,
                        borderRadius: "2rem",
                        padding: "0.7rem 2rem",
                    }}
                />
            </FlexBetween>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Post
                    </Typography>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: "span 4" }, marginTop: "20px"
                        }}
                    >
                        <TextField
                            label="Description"
                            onChange={(e) => setPost(e.target.value)}
                            value={post}
                            name="bio"
                            multiline
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            name="location"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <Box
                            border={`1px solid ${medium}`}
                            borderRadius="5px"
                            p="1rem"
                        >
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <FlexBetween>
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            width="100%"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!image ? (
                                                <p>Add Image Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{image.name}</Typography>
                                                    <EditOutlined />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                        {image && (
                                            <IconButton
                                                onClick={() => setImage(null)}
                                                sx={{ width: "15%" }}
                                            >
                                                <DeleteOutlined />
                                            </IconButton>
                                        )}
                                    </FlexBetween>
                                )}
                            </Dropzone>
                        </Box>
                        <Button
                            disabled={!post || !location || !image}
                            onClick={handlePost}
                            sx={{
                                color: palette.background.alt,
                                backgroundColor: palette.primary.main,
                                borderRadius: "3rem",
                            }}
                        >
                            POST
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
