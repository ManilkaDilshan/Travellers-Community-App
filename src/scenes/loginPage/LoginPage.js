import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


function LoginPage() {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <Box>
        <img src="../assets/logo1.png" alt='logo' width={"100px"} />

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Voyago, the Social Media platform for Travellers!
          </Typography>
          <Form />
        </Box>
      </Box>
    );
}

export default LoginPage
