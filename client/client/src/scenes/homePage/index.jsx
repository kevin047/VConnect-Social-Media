import React from "react";
import Navbar from "../navbar";
import { Box, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/userWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";



function HomePage() {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    const customScrollBarStyles = {
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#000",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      };

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 3%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "24%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? "47%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    mb={isNonMobileScreens ? "2rem" : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <Divider sx={{margin: "20px 0"}} />
                    <Box
                        sx={{
                            maxHeight: "calc(100vh - 4rem)",
                            overflowY: "auto",
                            ...customScrollBarStyles,
                            paddingRight: "3px"
                        }}
                    >
                        <PostsWidget userId={_id} />
                    </Box>
                </Box>

                {isNonMobileScreens && (
                    <Box flexBasis="24%">
                        <Box />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default HomePage;
