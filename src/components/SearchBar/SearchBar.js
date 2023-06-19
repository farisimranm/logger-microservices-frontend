import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../services/api';
import { insertAuditLogs, insertApiParam, insertPagination } from '../../redux/slices/auditLogSlice';
import { insertion as searchBarInsertion, reset } from '../../redux/slices/searchBarSlice';
import { getPrettyAuditLogs } from '../../utils/formatting';
import { Paper, TextField, Button, Box, FormControl } from "@mui/material";
import SearchAccordion from './SearchAccordion';
import SearchDatePicker from './SearchDatePicker';

function SearchBar() {
    const searchBarValue = useSelector((state) => state.searchBar.value);
    const referenceNumberValue = searchBarValue.referenceNumber;

    const dispatch = useDispatch();
    
    const createSearchCriteria = (filterKey, value, operation, dataOption) => {
        return {
            filterKey,
            value,
            operation,
            dataOption
        }
    }

    const saveSearchCriteria = () => {
        let searchCriteriaList =  [];
        Object.entries(searchBarValue).forEach(([key, value]) => {
            let operation = 'EQUAL';
            let dataOption = 'ALL';
            if(Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    if(i === 0)
                        dataOption = 'ALL';
                    else
                        dataOption = 'ANY';

                    if(key === 'module') {
                        if(value !== '')
                            searchCriteriaList.push(createSearchCriteria('activity.module', value[i], operation, dataOption));
                    }
                    else if(key === 'action') {
                        if(value !== '')
                            searchCriteriaList.push(createSearchCriteria('activity.action', value[i], operation, dataOption));
                    }
                    else {
                        if(value !== '')
                            searchCriteriaList.push(createSearchCriteria(key, value[i], operation, dataOption));
                    }
                }
            }
            else {
                if(value !== '')
                    searchCriteriaList.push(createSearchCriteria(key, value, operation, dataOption));
            }
        });
        return searchCriteriaList;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const searchCriteriaList = saveSearchCriteria();
        const apiResponse = await fetchData({ searchCriteriaList });
        dispatch(insertApiParam({ searchCriteriaList, page: 0 }));
        dispatch(insertAuditLogs(getPrettyAuditLogs(apiResponse.content)));
        dispatch(insertPagination({
            pageNumber: apiResponse.pageable.pageNumber,
            pageSize: apiResponse.pageable.pageSize,
            totalElements: apiResponse.totalElements,
            totalPages: apiResponse.totalPages
        }));
        dispatch(reset());
    };

    return (
        <Paper elevation={3}>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    marginY: 2,
                    paddingX: 2,
                    paddingY: 2,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Box
                    className='field-input-box'
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        pr: 1
                    }}
                >
                    <Box width='20%'>
                        <FormControl>
                            <TextField
                                name="referenceNumber"
                                label="Reference Number"
                                value={referenceNumberValue}
                                onChange={(e) => {
                                    dispatch(searchBarInsertion({
                                        ...searchBarValue,
                                        referenceNumber: e.target.value
                                    }))
                                }}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 3 } }}
                                sx={{
                                    backgroundColor: "#D9D9D9",
                                    label: {
                                        color: '#000000',
                                    },
                                    borderRadius: 3,
                                }}
                            />
                        </FormControl>
                    </Box>
                    
                    <Box width='15%'>
                        <FormControl>
                            <SearchAccordion
                                label='Module'
                                keyname='module'
                            />
                        </FormControl>
                    </Box>
                    
                    <Box width='15%'>
                        <FormControl>
                            <SearchAccordion
                                label='Action'
                                keyname='action'
                            />
                        </FormControl>
                    </Box>
                    
                    <Box width='15%'>
                        <FormControl>
                            <SearchAccordion
                                label='Level'
                                keyname='logLevel'
                            />
                        </FormControl>
                    </Box>
                    
                    <Box width='15%'>
                        <FormControl>
                            <SearchDatePicker
                                label='Start Date'
                                keyname='transactionTimestampStart'
                            />
                        </FormControl>
                    </Box>
                    
                    <Box width='15%'>
                        <FormControl>
                            <SearchDatePicker
                                label='End Date'
                                keyname='transactionTimestampEnd'
                            />
                        </FormControl>
                    </Box>
                    
                    <Box>
                        <FormControl>
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{
                                backgroundColor: '#000000',
                                color: '#FFFFFF',
                                textTransform: 'none',
                                borderRadius: 3,
                                paddingY: 2,
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: '#FFFFFF',
                                },
                            }}
                        >
                            Search
                        </Button>
                    </FormControl>
                    </Box>

                </Box>
                
                
            </Box>
        </Paper>
        );
}
 
export default SearchBar;