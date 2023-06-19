import React from 'react';
import { Paper, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AuditAccordionHeader = () => {
    return (
        <Paper
            className='accordion-header-paper'
            elevation={3}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: 3,
                marginBottom: 1
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box marginX={2} marginY={1}>
                        <Typography>FIELD</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box marginX={2} marginY={1}>
                        <Typography>PREVIOUS</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box marginX={2} marginY={1}>
                        <Typography>LATEST</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

const AuditAccordionBody = (props) => {
    const auditTrail = JSON.parse(props.auditTrail);

    return (
        <Paper
            className='accordion-body-paper'
            elevation={3}
            sx={{
                marginBottom: 1
            }}
        >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{ auditTrail.info.entity }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box marginX={2} marginY={1}>
                                {
                                    auditTrail.changes.map((change) => {
                                        return (
                                            <Typography>
                                                {change.path}<br/>
                                            </Typography>
                                        );
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box marginX={2} marginY={1}>
                            {
                                auditTrail.changes.map((change) => {
                                    return (
                                        <Typography sx={{ opacity: 0.6 }}>
                                            {change.desc.displayName}<br/>
                                        </Typography>
                                    )
                                })
                            }
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box marginX={2} marginY={1}>
                            {
                                auditTrail.changes.map((change) => {
                                    return (
                                        <Typography>
                                            {change.desc.description}<br/>
                                        </Typography>
                                    )
                                })
                            }
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails> 
            </Accordion>
        </Paper>
    );
}

const AuditLogAccordion = (props) => {
    const { auditTrail } = props;

    return (
        <Box>
            <AuditAccordionHeader />
            <AuditAccordionBody auditTrail={auditTrail} />
        </Box>
    );
};

export default AuditLogAccordion;