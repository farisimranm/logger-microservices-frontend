import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#000000',
        padding: 1,
        textAlign: 'center',
        marginTop: 1,
      }}
    >
        <Typography
            variant="h6"
            color="#FFFFFF"
            sx={{
                fontSize: 20,
                opacity: 0.4
            }}
        >
            © Deloitte.com. All Rights Reserved
        </Typography>
    </Box>
  );
};

export default Footer;