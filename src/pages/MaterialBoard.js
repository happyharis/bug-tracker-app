import { Box, Typography } from "@mui/material";
import React from "react";

function MaterialBoard() {
  return (
    <Box
      sx={{
        maxWidth: 275,
        backgroundColor: "#EBECF0",
        borderRadius: 0.5,
        padding: 2,
      }}
    >
      <Typography>Doing</Typography>
    </Box>
  );
}

export default MaterialBoard;
