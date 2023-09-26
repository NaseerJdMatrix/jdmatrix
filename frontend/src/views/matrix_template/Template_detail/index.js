import * as React from 'react';
import Paper from '@mui/material/Paper';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Alert from 'ui-component/Alert_SnackBar/Alert_SnackBar';
import { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Menu_Button from 'ui-component/Menu_Button/Menu_Button';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';

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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4
};


const columns = [{ id: 'Organization', label: 'Organization', minWidth: 170 },{ id: 'StackHolderType', label: 'StakeHolder Type', minWidth: 170 },{ id: 'StakeHolder', label: 'StakeHolder', minWidth: 170 },{ id: 'StakeHolder', label: 'Nature', minWidth: 170 },];


export default function TemplateDetail() {
    const navigate=useNavigate();
    const { id } = useParams();
    const [rows,setRows]=useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [templateDetail, setTemplateDetail] = React.useState({});
    const [functions, setFunction] = React.useState([]);
    const [functionTree, setFunctionTree] = React.useState([]);
    const [functionname, setFunctionName] = React.useState('');
    const [editfunctionname, setEditFunctionName] = React.useState('');
    const [selectedFunction, setSelectedFunction] = React.useState('');
    const [selectedFunctionId, setSelectedFunctionId] = React.useState('');
    const [openSubFunctionModel, SetOpenSubFunctionModel] = React.useState(false);
    const [openEditFunctionModel, SetOpenEditFunctionModel] = React.useState(false);
    
    const handleOpenSubFunctionModel = () => SetOpenSubFunctionModel(true);
    const handleCloseSubFunctionModel = () => SetOpenSubFunctionModel(false);
    const [submitted, setSubmitted] = React.useState(0);
    const [editModelData, setEditModelData] = React.useState({});




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // --------------------------For Snacbar Alert-----------------------------------
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('');
    const [expanded, setExpanded] = useState([]);

    function handleOpenEditFunctionModel(data){
        setEditModelData(data)
        SetOpenEditFunctionModel(true)
    };
    const handleChangeeditname=(e)=>{
        let data={...editModelData};
        data.name=e.target.value;
        setEditModelData(data);
    }
    const handleCloseEditFunctionModel = () => SetOpenEditFunctionModel(false);


    const handleToggle = (nodeId) => {
      if (expanded.includes(nodeId)) {
        setExpanded(expanded.filter((id) => id !== nodeId));
      } else {
        setExpanded([...expanded, nodeId]);
      }
    };
    const handleClick = () => { 
        
        setOpenSnackBar(true);
    };
    const handleSnackClose = () => {
        setOpenSnackBar(false);
    };
   // --------------------------End Snacbar Alert-----------------------------------
  


    function fetchTemplate() {
        axios.get(process.env.REACT_APP_BACKEND_URL+'template/' + id).then((response) => {
            setTemplateDetail(response.data.template);
            const functions_data=transformToTree(response.data.functions);

            setFunctionTree(functions_data)
            setFunction(response.data.functions);

        });
    }

    const transformToTree = (functionData) => {
        const functionMap = {};
        const treeData = [];
      
        // Create a map of functions using their IDs as keys
        functionData.forEach((singleFunction) => {
          functionMap[singleFunction._id] = { ...singleFunction, children: [] };
        });
       
        // Build the tree structure by assigning child functions to their parent recursively
        functionData.forEach((singleFunction) => {
          if (singleFunction.parent_function_id) {
            const parentFunction = functionMap[singleFunction.parent_function_id];
            if (parentFunction) {
              parentFunction.children.push(functionMap[singleFunction._id]);
            }
          } else {
            treeData.push(functionMap[singleFunction._id]);
          }
        });
      
        return treeData;
      };
      const handleIconClick = (node) => {
        // Perform your specific task here
        setSelectedFunction(node)
        setSelectedFunctionId(node._id)
        console.log(node)
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

    const submitaddform=()=>{
        if(functionname.length!=0 ){
            console.log()
            axios.post(process.env.REACT_APP_BACKEND_URL+'functions/',{
                name:functionname,
                parent_template_id:id
            }).then((response)=>{
                
                    if (!response.data.error) {
                        setMsg(response.data.message);
                        setMsgType('success');
                        handleClick();
                        
                    }else{
                        setMsg(response.data.message);
                        setMsgType('error');
                        handleClick();
                    }
                
               
                setFunctionName('');
                handleCloseSubFunctionModel();
                setSubmitted(submitted+1);
            }).catch((err)=>{
                console.log(err)
                setMsg(err.response.data.message);
                setMsgType('error');
                handleClick();
            });
        }
    }
    const submiteditform=()=>{
        console.log(editModelData);
        if(editModelData.name.length!=0 ){
            console.log()
            axios.patch(process.env.REACT_APP_BACKEND_URL+'functions/'+editModelData._id,editModelData).then((response)=>{
                
                    if (!response.data.error) {
                        setMsg(response.data.message);
                        setMsgType('success');
                        handleClick();
                        
                    }else{
                        setMsg(response.data.message);
                        setMsgType('error');
                        handleClick();
                    }
                
               
                setEditFunctionName('');
                handleCloseEditFunctionModel();
                setSubmitted(submitted+1);
            }).catch((err)=>{
                console.log(err)
                setMsg(err.response.data.message);
                setMsgType('error');
                handleClick();
            });
        }
    }
    
    const handleDelete= (id)=>{ 
        console.log(id)
        axios.delete(process.env.REACT_APP_BACKEND_URL+'functions/'+id).then((response)=>{
            setMsg(response.data.message);
            setMsgType('success');
            handleClick();
            setSubmitted(submitted+1);
        }).catch((err)=>{
            console.log(err)
            setMsg(err.response.data.message);
            setMsgType('error');
            handleClick();
        });
    }

  
    const handleKeyPress = (event) => {
        // Prevent user from typing numeric characters
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode >= 48 && charCode <= 57) {
          event.preventDefault();
        }
      };


    useEffect(() => {
        fetchTemplate();
    }, [submitted])
    
    const extract_date=(date)=>{
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d=new Date(date)
        return d.getDate()+"-"+months[d.getMonth()]+"-"+d.getFullYear()
    }
    return (
        <>
        <Alert openSnackBar={openSnackBar} handleClose={handleSnackClose} msgType={msgType} msg={msg}/>
            <MainCard title="Template Detail" sx={{ paddingBottom: '2%' }}>
                <Grid container spacing={2} display={'flex'} justifyContent={'end'}>
                    <Grid item>
                    <Button sx={{ float: 'right', backgroundColor: '#5e35b1' }} variant="contained" onClick={()=>navigate('/admin/add_functions/'+templateDetail._id)}>
                        Add Function
                    </Button>
                    </Grid>
                    
                    
                </Grid>

               
                <Grid container sx={{ marginTop: '20px' }}>
                    <Grid md={4} sm={12}>
                        <h4>Template Name:</h4> {templateDetail.name}
                    </Grid>
                    <Grid md={4} sm={12}>
                        <h4>Template Short Name:</h4> {templateDetail.shortname}
                    </Grid>
                    
                    <Grid md={4} sm={12}>
                        <h4>Template Creation Date :</h4> {extract_date(templateDetail.createdAt)}
                    </Grid>
                </Grid>
            </MainCard>

            <MainCard title="Functions" sx={{ marginTop: '3%' }}>
                {
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
                                link:``,
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
                }
                
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Grid container >
                        <Grid item sm={3} md={3} lg={3}>
                            {functions.length!=0?
                                <TreeView
                                expanded={expanded}
                                >
                                    {renderTreeNodes(functionTree)}
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

                    <Modal
                        fullWidth
                        open={openEditFunctionModel}
                        onClose={handleCloseEditFunctionModel}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h3" component="h2">
                                Edit Function
                            </Typography>
                            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                                <Grid item xs={12}>
                                    <TextField fullWidth onKeyPress={handleKeyPress}  id="outlined-basic" label="Function Name" variant="outlined" value={editModelData.name} onChange={handleChangeeditname}/>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <Button fullWidth sx={{ height: '50px', borderRadius: '8px' }} onClick={submiteditform} variant="outlined" >
                                        Edit Function
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                    
                    
                </Paper>
            </MainCard>
        </>
    );
}
