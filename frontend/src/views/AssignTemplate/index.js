import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { maxWidth } from '@mui/system';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4
};

const columns = [
    { id: 'template_name', label: 'Template Name', minWidth: 170 },
    { id: 'assigned_to', label: 'Assigned To', minWidth: 170 },
];


export default function Index() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [assignedTemplates,setAssignedTemplates]=useState([]);
    
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function fetchAssignedTemplate(){
        axios.get(process.env.REACT_APP_BACKEND_URL+'assignTemplate/').then((response)=>{
          setAssignedTemplates(response.data.data)
        });
    }
  
    useEffect(()=>{
        fetchAssignedTemplate();
    },[])

    return (
        <MainCard title="Assigned Templates">
            <Link to="/admin/assign_template/">
                <Button sx={{ float: 'right', backgroundColor: '#5e35b1' }} variant="contained">
                    Assign Template
                </Button>
            </Link>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ marginTop: '3%', maxHeight: 440, borderRadius: '10px' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: '#5e35b1', color: 'white',maxWidth: column.maxWidth, }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell style={{ minWidth: 170, backgroundColor: '#5e35b1', color: 'white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignedTemplates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>

                                            <TableCell>
                                                {row.template.template.name}
                                            </TableCell>
                                            <TableCell>
                                            {
                                              row.assignTo ==='Organization'?
                                              row.organization_id.name+' [Organization]':
                                              row.assignTo ==='Department'?
                                              row.department_id.name+' [Department]':
                                              row.assignTo ==='Employee'?
                                              row.employee_id.name+' [Employee]':
                                              ''
                                            }
                                                    
                                            </TableCell>
                                            <TableCell>
                                                <Link to={"/admin/assigned_template_detail/"+row._id}>
                                                    <FormatListBulletedIcon sx={{ color: '#2196f3', marginRight: '5px' }} />
                                                </Link> 
                                                <DeleteIcon sx={{ color: 'red' }} />
                                            </TableCell>
                                        </TableRow>
                                        
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 20, 50]}
                    component="div"
                    count={assignedTemplates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </MainCard>
    );
}
