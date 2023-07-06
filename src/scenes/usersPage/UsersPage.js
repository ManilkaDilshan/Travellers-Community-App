import { Box, useMediaQuery } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "scenes/navBar/NavBar";
import UsersListWidget from "scenes/widgets/UsersListWidget";

function UsersPage() {
    const { userId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <Box m="2rem 0" />
                    <UsersListWidget userId={userId} />
                </Box>
            </Box>
        </Box>
    )
}

export default UsersPage
