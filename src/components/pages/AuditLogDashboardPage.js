import React, { Component } from "react";
import { Container, Typography, Box } from "@mui/material";
import AuditLogTable from "../AuditLog/AuditLogTable";

class AuditLogDashboard extends Component {
    state = {  } 
    render() { 
        return (
            <Box minHeight='100vh'>
                <Container>
                    <Box className='page-header'>
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight: 'bold',
                                marginY: 2,
                            }}
                        >
                            Audit Log
                        </Typography>
                    </Box>
                    <Box className='log-table'>
                        <Typography
                            variant='h6'
                            sx={{
                                textDecoration: 'underline',
                                textDecorationColor: '#26890D',
                                textDecorationThickness: 3,
                                textUnderlineOffset: 7,
                            }}
                        >
                            All Audit Log
                        </Typography>
                        <AuditLogTable />
                    </Box>
                </Container>
            </Box>
            
        );
    }
}
 
export default AuditLogDashboard;