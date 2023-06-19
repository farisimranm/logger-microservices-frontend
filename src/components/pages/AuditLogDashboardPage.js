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
                        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                            Audit Log
                        </Typography>
                    </Box>
                    <Box className='log-table'>
                        <Typography variant='h6'>All Audit Log</Typography>
                        <AuditLogTable />
                    </Box>
                </Container>
            </Box>
            
        );
    }
}
 
export default AuditLogDashboard;