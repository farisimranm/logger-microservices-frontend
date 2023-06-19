import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => { 
    return (
        <AppBar
            component='header'
            position="static"
            sx={{ backgroundColor: 'black' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <img
                            src="deloitte-logo.png"
                            alt="Company Logo"
                            component="a"
                            href="/"
                            width={130}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                marginX: 1
                            }}
                        >
                            | ICDC RMS
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#aaaaaa',
                                },
                            }}
                        >
                            Dashboard
                        </Button>    
                        <Button variant="text" sx={{ color: 'white', textTransform: 'none' }}>Configuration</Button>
                        <Button variant="text" sx={{ color: 'white', textTransform: 'none' }}>Activity Log</Button>
                        <Button variant="text" sx={{ color: 'white'}}>
                            <AccountCircleIcon />
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
 
export default Header;