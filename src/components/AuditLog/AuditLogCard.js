import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const AuditCard = (props) => {
    const { card } = props;

    const convertToTitleCase = (word) => {
        const words = word.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
        const titleCaseWords = words.map(word => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1);
            return firstLetter + restOfWord;
        });
        return titleCaseWords.join(' ');
    }

    const iterateObject = (desc) => {
        return Object.keys(desc).map((key) => {
            const value = desc[key];
        
            if(typeof value === 'object') {
                return iterateObject(value);
            }
        
            return (
                <Typography variant="body2" sx={{ lineHeight: 1.5 }} key={key}>
                    {convertToTitleCase(key)}: {value}<br />
                </Typography>
            );
        });
    };      

    return (
        <Card
            sx={{
                backgroundColor: '#FFFFFF',
                minHeight: '100%',
                paddingX: 1,
                borderRadius: 3,
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box className='card-title'>
                    {
                        card.referenceNumber ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <Typography variant='body1' fontWeight={700}>
                                    {card.title}
                                </Typography>
                                <ChevronRightIcon sx={{ opacity: 0.5 }}  /> 
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: '#26890D',
                                        textDecoration: 'underline',
                                        fontWeight: 700
                                    }}
                                >  
                                    {card.referenceNumber}
                                </Typography>
                            </Box>
                        ) : (
                            <Box mb={1}>
                                <Typography variant='body1' fontWeight={700}>
                                    { card.title }
                                </Typography>
                            </Box>
                        )
                    }
                </Box>
                <Box
                    className="card-body"
                    sx={{
                        position: 'relative',
                        minHeight: '150px',
                    }}
                >
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'stretch',
                            paddingRight: 1,
                            wordBreak: 'break-word',
                        }}
                    >
                        { iterateObject(JSON.parse(card.desc)) }
                    </Box>
                    <Box
                        className='card-icon'
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#26890D',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        { card.icon }
                    </Box>
                </Box>
                
            </CardContent>
        </Card>
    );
};
  
export default AuditCard;