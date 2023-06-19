import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchAccordionText from './SearchAccordionText';

function SearchAccordion(props) {
    const [expanded, setExpanded] = useState(false);
    const { label, keyname } = props;
    const width = 150;
    const height = 50;

    const handleAccordionEnter = () => {
        setExpanded(true);
    };

    const handleAccordionLeave = () => {
        setExpanded(false);
    };

    return (
        <Box>
            <Accordion
                expanded={expanded}
                onMouseEnter={handleAccordionEnter}
                onMouseLeave={handleAccordionLeave}
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    width: expanded ? 330 : width,
                    borderRadius: 3,
                }}
            >
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon sx={{ color: expanded ? '#FFFFFF' : '#000000' }} />}
                    sx={{
                        backgroundColor: expanded ? 'primary.main' : '#D9D9D9',
                        color: expanded ? '#FFFFFF' : '#000000',
                        width: width,
                        height: height,
                        borderRadius: 3,
                    }}
                >
                    <Typography>
                        {label}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SearchAccordionText
                        label={label}
                        keyname={keyname}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion
                className='fake-accordion'
                sx={{ width: width, opacity: 1, boxShadow: 'none' }}
            >
                <AccordionSummary
                    sx={{
                        height: height,
                        borderRadius: 3,
                    }}
                >
                </AccordionSummary>
            </Accordion>
        </Box>
    );
};

export default SearchAccordion;