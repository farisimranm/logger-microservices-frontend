import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { insertAuditLogs, insertApiParam, insertPagination } from '../../redux/slices/auditLogSlice';
import { fetchData } from '../../services/api';
import { getPrettyAuditLogs } from '../../utils/formatting';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import SearchBar from '../SearchBar/SearchBar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'referenceNumber',
    label: 'Reference Number',
    width: '20%',
  },
  {
    id: 'module',
    label: 'Module',
    width: '15%',
  },
  {
    id: 'action',
    label: 'Action',
    width: '10%',
  },
  {
    id: 'transactionTimestamp',
    label: 'Date',
    width: '25%',
  },
  {
    id: 'logLevel',
    label: 'Level',
    width: '15%',
  },
  {
    id: 'username',
    label: 'User',
    width: '15%',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{backgroundColor: '#D9D9D9'}}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align='left'
            width={headCell.width}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 600 }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function AuditLogTable() {
  const auditLogs = useSelector((state) => state.auditLog.value);
  const apiParam = useSelector((state) => state.auditLog.apiParam);
  const { pageNumber, pageSize, totalElements, totalPages } = useSelector((state) => state.auditLog.pagination);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('referenceNumber');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callApi = async ({ pageNumber = 0 } = {}) => {
    const apiResponse = await fetchData({ ...apiParam, page: pageNumber });
    dispatch(insertApiParam({ ...apiParam, page: pageNumber }));
    dispatch(insertAuditLogs(getPrettyAuditLogs(apiResponse.content)));
    dispatch(insertPagination({
      pageNumber: apiResponse.pageable.pageNumber,
      pageSize: apiResponse.pageable.pageSize,
      totalElements: apiResponse.totalElements,
      totalPages: apiResponse.totalPages
    }));
  }

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    callApi();
  }, [totalElements]);

  useEffect(() => {
    const sortedAuditLog = stableSort(auditLogs, getComparator(order, orderBy));
    dispatch(insertAuditLogs(sortedAuditLog));
  }, [order, orderBy]);

  const NavigateToDetailsPage = (requestParam) => {
      navigate(`/audit/${requestParam}`);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, requestParam) => {
    NavigateToDetailsPage(requestParam);
  };

  const handleChangePage = (event, newPageNumber) => {
    event.preventDefault();
    callApi({ pageNumber: newPageNumber });
  };

  const getEntriesMessage = () => {
    if(pageNumber === 0 && Array.isArray(auditLogs) && auditLogs.length === 0) {
      return "No entries available";
    }

    const x = (pageNumber === 0) ? 1 : (pageNumber * pageSize) + 1;
    const y = (pageNumber === totalPages - 1) ? totalElements : (pageNumber + 1) * pageSize;
    const z = totalElements;

    return `Showing ${x} to ${y} of ${z} entries`;
  }

  return (
    <Box elevation={0} sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ width: '100%', mb: 2 }}>
        <SearchBar />
        <Container
            elevation={0}
        >
            <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                {
                  Array.isArray(auditLogs) && auditLogs.length > 0 ? (
                    auditLogs.map((auditLog, index) => {
                      return (
                        <TableRow
                            key={auditLog.referenceNumber}
                            hover
                            onClick={(event) => handleClick(event, auditLog.auditLogId)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>{auditLog.referenceNumber}</TableCell>
                            <TableCell>{auditLog.module}</TableCell>
                            <TableCell>{auditLog.action}</TableCell>
                            <TableCell>{auditLog.transactionTimestamp}</TableCell>
                            <TableCell>{auditLog.logLevel}</TableCell>
                            <TableCell>{auditLog.username}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                      <TableRow>
                          <TableCell>No records found</TableCell>
                      </TableRow>
                  )
                }
                </TableBody>
            </Table>
            </TableContainer>
            <Box
                elevation={0}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginY: 2,
                }}
            >
                <Typography variant='h6'>
                  { getEntriesMessage() }
                </Typography>
                <Pagination
                    count={totalPages - 1}
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                              color: 'black',
                              backgroundColor: 'white',
                          '&:hover': {
                              backgroundColor: '#D9D9D9',
                          },
                          '&.Mui-selected': {
                              color: 'white',
                              backgroundColor: 'primary.main',
                              '&:hover': {
                              backgroundColor: 'primary.dark',
                              },
                          },
                        },
                    }}
                    onChange={handleChangePage}
                />
            </Box>
        </Container>
      </Paper>
    </Box>
  );
}
 
export default AuditLogTable;