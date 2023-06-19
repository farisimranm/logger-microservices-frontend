import React, { Component } from "react";
import { Box, Container, Typography } from "@mui/material";

class NotFoundPage extends Component {
    state = {  } 
    render() { 
        return (
            <Box minHeight='100vh'>
                <Container>
                    <Typography>
                        404 | Page Not Found
                    </Typography>
                </Container>
            </Box>
            
        );
    }
}
 
export default NotFoundPage;