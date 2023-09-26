import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Menu_Button from 'ui-component/Menu_Button/Menu_Button';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TreeView from '@mui/lab/TreeView';

import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const columns = [{ id: 'Organization', label: 'Organization', minWidth: 170 },{ id: 'StackHolderType', label: 'StakeHolder Type', minWidth: 170 },{ id: 'StakeHolder', label: 'StakeHolder', minWidth: 170 },{ id: 'StakeHolder', label: 'Nature', minWidth: 170 },];

export default function Index() {
    const {employee_id}=useParams();
    const {index}=useParams();
    const [rows,setRows]=useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [template,setTemplate]=useState(null);
    const [expanded, setExpanded] = useState([]);
    const [selectedFunction, setSelectedFunction] = React.useState('');
    const [selectedFunctionId, setSelectedFunctionId] = React.useState('');

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
    const handleToggle = (nodeId) => {
      if (expanded.includes(nodeId)) {
        setExpanded(expanded.filter((id) => id !== nodeId));
      } else {
        setExpanded([...expanded, nodeId]);
      }
    };
   
    const handleIconClick = (node) => {
      // Perform your specific task here
      setSelectedFunction(node)
      setSelectedFunctionId(node._id)
    };
    const renderTreeNodes = (nodes) => {
      return nodes.map((node) => (
        <TreeItem
        key={node._id}
        nodeId={node._id.toString()}
        label={
          <Box sx={{display:'flex'}} onClick={(e) =>{
              e.stopPropagation();
            }}>
            {Array.isArray(node.children) && node.children.length ? (
              <ChevronRightIcon  onClick={() => handleToggle(node._id)} />
              ) : (
                // just align text equaly
              <ChevronRightIcon sx={{visibility:'hidden'}} />
              
            )}
            <Box component="div" sx={{ display: 'inline',marginTop:'5px'}} onClick={()=>{handleIconClick(node)}}>{node.name}</Box>
            
          </Box>
        }
      >
        {Array.isArray(node.children) ? renderTreeNodes(node.children) : null}
      </TreeItem>
      ));
    };
    function fetchEmplData () {
      axios.get(process.env.REACT_APP_BACKEND_URL+'employee/'+ employee_id).then((response) => {
        // setData(response.data)
        // console.log(response.data)
        setTemplate(response.data.employee.templates[index]);
        console.log(response.data.employee.templates[index])
      })
    }
    const extract_date=(date)=>{
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const d=new Date(date)
      return d.getDate()+"-"+months[d.getMonth()]+"-"+d.getFullYear()
  }
    useEffect(()=>{
      fetchEmplData()
    },[]);
  return (
    <>
      <MainCard title="Template Detail" sx={{ paddingBottom: '2%' }}>
                {
                  template!=null?(
                  <Grid container sx={{ marginTop: '20px' }}>
                      <Grid md={4} sm={12}>
                          <h4>Template Name:</h4> {template.template.name}
                      </Grid>
                      <Grid md={4} sm={12}>
                          <h4>Template Short Name:</h4> {template.template.shortname}
                      </Grid>
                      
                      <Grid md={4} sm={12}>
                          <h4>Template Creation Date :</h4> {extract_date(template.template.createdAt)}
                      </Grid>
                  </Grid>
                  ):('Loading')
                }
            </MainCard>

            <MainCard title="Functions" sx={{ marginTop: '3%' }}>
                {/* {
                    selectedFunction!=''? 
                    <Grid container spacing={2} display={'flex'} justifyContent={'end'}>
                    <Grid item>
                        <Menu_Button button_name={'Options for '+selectedFunction.name} action={
                            [{
                                label: 'Add Sub Function to '+selectedFunction.name,
                                link:`/admin/add_sub_function/${selectedFunctionId}/${templateDetail._id}`,
                                data:selectedFunction
                            },
                            {
                                label: 'Edit '+selectedFunction.name,
                                link:'',
                                onclickMethod:{handleOpenEditFunctionModel},
                                data:selectedFunction

                            },
                            {
                                label: 'Delete '+selectedFunction.name,
                                link:'',
                                onclickMethod:{handleDelete},
                                data:selectedFunction
                            }]
                        }/>
                    </Grid>
                </Grid>:''
                } */}
                {
                  template!=null?(
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                      <Grid container >
                          <Grid item sm={3} md={3} lg={3}>
                              {template.functions.length!=0?
                                  <TreeView
                                  expanded={expanded}
                                  
                                  >
                                      {renderTreeNodes(template.functions)}
                                  </TreeView>:''
                              }
                          </Grid>
                          <Grid  sm={1} md={1} lg={1} sx={{borderLeft:'1px solid #e6e6e6'}}>
                            
                          </Grid>
                          <Grid item sm={8} md={8} lg={8} >
                          {
                            selectedFunction!=''? 
                            <Grid container sx={{ marginTop: '20px' }}>
                                <Grid md={4} sm={12}>
                                    <h4>Function Name:</h4> {selectedFunction.name}
                                </Grid>
                                {
                                  selectedFunction.responsibility?
                                  <Grid md={4} sm={12}>
                                    <h4>Responsibility Name:</h4> {selectedFunction.responsibility.name}
                                  </Grid>
                                  :
                                  ''
                                }
                                <Grid md={4} sm={12}>
                                    <h4>Function Creation Date :</h4> {extract_date(selectedFunction.createdAt)}
                                </Grid>
                                <Grid md={12} sm={12}>
                              <Paper sx={{ width: '100%', overflow: 'hidden',marginTop:'20px' }}>
                              <h4>StakeHolders:</h4>
                                <TableContainer sx={{ marginTop: '3%', maxHeight: 440, borderRadius: '10px' }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, backgroundColor: 'grey', color: 'white' }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        
                                            {selectedFunction.stackholders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                return (
                                                    <>
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                            
                                                            <TableCell key={row._id}>
                                                                {row.organization.name}
                                                            </TableCell>
                                                            <TableCell key={row._id}>
                                                                {row.stakeholderType}
                                                            </TableCell>
                                                            <TableCell key={row._id}>
                                                                {row.stackholder.name}
                                                            </TableCell>
                                                            <TableCell key={row._id}>
                                                                {row.stackHolderNature.name}
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
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                              </Grid>
                            </Grid>
                            :
                            <Grid display="flex" alignItems="center" container sx={{height:100}}>

                              <Typography> No Function Is Selected</Typography>
                            </Grid>
                          }
                          </Grid>
                      </Grid>

                    
                      
                      
                  </Paper>
                  ):('Loading')
                }
            </MainCard>
    </>
  )
}
