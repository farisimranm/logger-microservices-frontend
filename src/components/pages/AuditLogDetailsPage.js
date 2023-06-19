import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid, Paper } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import PersonIcon from '@mui/icons-material/Person';
import AuditLogCard from "../AuditLog/AuditLogCard";
import AuditLogAccordion from "../AuditLog/AuditLogAccordion";

function AuditLogDetailsPage() {
    const [auditLog, setAuditLog] = useState({});
    const { id } = useParams();

    const getAuditLogCards = () => {
        const { referenceNumber, transactionTimestamp, activity, source, destination, status } = auditLog;
        const cards = [
            {
                referenceNumber: referenceNumber,
                title: 'Activity',
                desc: JSON.stringify({
                    module: activity.module,
                    action: activity.action,
                    status: status.message,
                    timestamp: transactionTimestamp
                }),
                icon: <GroupsIcon sx={{ color: '#FFFFFF' }} />
            },
            {
                title: 'Source',
                desc: JSON.stringify({
                    channel: source.channel,
                    address: {
                        type: source.address.type,
                        value: source.address.value
                    }
                }),
                icon: <AccountTreeIcon sx={{ color: '#FFFFFF' }} />
            },
            {
                title: 'Destination',
                desc: JSON.stringify({
                    channel: destination.channel,
                    address: {
                        type: destination.address.type,
                        value: destination.address.value
                    }
                }),
                icon: <WhereToVoteIcon sx={{ color: '#FFFFFF' }} />
            },
            {
                title: 'User',
                desc: JSON.stringify({
                    id:  source.user.userId,
                    name: source.user.username
                }),
                icon: <PersonIcon sx={{ color: '#FFFFFF' }} />
            }
        ];
        return cards;
    };

    const fetchData = async (auditLogId) => {
        try {
          const response = await fetch('http://localhost:8081/api/v1/log/audit/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "page": 0,
              "size": 1,
              "logKey": "46064943-054f-44a2-9e19-d8daa5944f98",
              "searchCriteriaList": [
                {
                  "filterKey": "auditLogId",
                  "value": auditLogId,
                  "operation": "EQUAL",
                  "dataOption": "ALL"
                }
              ]
            }),
          });
          if(response.ok) {
            const apiResponse = await response.json();
            setAuditLog(apiResponse.content[0]);
          }
          else {
            console.error('Failed to fetch audit logs:', response.status);
          }
        } catch (error) {
          console.error('Error fetching audit logs:', error);
        }
    };

    useEffect(() => {
        fetchData(id);
      }, []);

    return (
        <Box minHeight='100vh'>
            <Box
                className='page-header'
                sx={{
                    backgroundColor: '#000000',
                    paddingX: 5,
                    paddingBottom: 2
                }}
            >
                <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                    More Information
                </Typography>
                
                <Grid container spacing={4}>
                {
                    Object.keys(auditLog).length > 0 ? (
                        getAuditLogCards().map((card, index) =>  (
                            <Grid item xs={3}>
                                <AuditLogCard key={index} card={card} />
                            </Grid>
                        ))
                    ) : (
                        <Typography>Loading...</Typography>
                    )
                }
                </Grid>
            </Box>
            <Box
                className='log-details'
                sx={{
                    paddingX: 5,
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={9}>
                        {
                            Object.keys(auditLog).length > 0 ? (
                                <AuditLogAccordion auditTrail={JSON.stringify(auditLog.auditTrail)} />
                            ) : (
                                <Typography>Loading...</Typography>
                            )
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            className='side-paper'
                            elevation={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                marginTop: 3,
                            }}
                        >
                            <Box padding={1}>
                                <Typography
                                    sx={{
                                        backgroundColor: '#26890D',
                                        color: '#FFFFFF',
                                        paddingX: 1
                                    }}
                                >
                                    SUCCESS
                                </Typography>
                                <hr/>
                            </Box>
                            <Box padding={1}>
                            {
                                Object.keys(auditLog).length > 0 ? (
                                    <Typography variant='body2'>
                                        Status Code: {auditLog.status.code}<br/>
                                        {auditLog.status.message}
                                    </Typography>
                                ) : (
                                    <Typography>Loading...</Typography>
                                )
                            }
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
 
export default AuditLogDetailsPage;