import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Menu_Button from 'ui-component/Menu_Button/Menu_Button';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Index() {
    const { id } = useParams();
    const [templateDetail, setTemplateDetail] = useState(null);
    const [selectedFunction, setSelectedFunction] = React.useState('');
    const [selectedFunctionId, setSelectedFunctionId] = React.useState('');
    const [expanded, setExpanded] = useState([]);
    


    const handleToggle = (nodeId) => {
        if (expanded.includes(nodeId)) {
            setExpanded(expanded.filter((id) => id !== nodeId));
        } else {
            setExpanded([...expanded, nodeId]);
        }
    }
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
                    <Box sx={{ display: 'flex' }} onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        {Array.isArray(node.children) && node.children.length ? (
                            <ChevronRightIcon onClick={() => handleToggle(node._id)} />
                        ) : (
                            // just align text equaly
                            <ChevronRightIcon sx={{ visibility: 'hidden' }} />

                        )}
                        <Box component="div" sx={{ display: 'inline', marginTop: '5px' }} onClick={() => { handleIconClick(node) }}>{node.name}</Box>

                    </Box>
                }
            >
                {Array.isArray(node.children) ? renderTreeNodes(node.children) : null}
            </TreeItem>
        ));
    };


    const getTemplateDetail = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'assignTemplate/' + id).then((response) => {
            setTemplateDetail(response.data.data);
            console.log(response.data.data);
            
        }).catch((error) => {
            console.log(error)
        })
    }

    const extract_date=(date)=>{
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d=new Date(date)
        return d.getDate()+"-"+months[d.getMonth()]+"-"+d.getFullYear()
    }

    useEffect(() => {
        getTemplateDetail();
    }, [])
    return (
        <>
        
        <MainCard title="Asigned Template Detail" sx={{ paddingBottom: '2%' }}>
            {
                templateDetail!=null?(
                    <Grid container sx={{ marginTop: '20px' }}>
                        <Grid md={4} sm={12}>
                            <h4>Template Name:</h4> {templateDetail.template.template.name}
                        </Grid>
                        <Grid md={4} sm={12}>
                            <h4>Assign To:</h4> {templateDetail.assignTo}
                        </Grid>

                        <Grid md={4} sm={12}>
                            <h4>Organization :</h4> {templateDetail.organization_id.name}
                        </Grid>


                        {
                            templateDetail.assignTo=='Department' || templateDetail.assignTo=='Employee'?
                            (
                                <Grid md={4} sm={12}>
                                    <h4>Department :</h4> {templateDetail.department_id.name}
                                </Grid>
                            ):
                            ''
                        }
                        
                        {
                            templateDetail.assignTo=='Employee'?
                            (
                                <Grid md={4} sm={12}>
                                    <h4>Employee :</h4> {templateDetail.employee_id.name}
                                </Grid>
                            ):
                            ''
                        }
                    </Grid>
                ):
                'Loading'
            }
        </MainCard>
        <MainCard title="Functions" sx={{ marginTop: '3%' }}>
            {
                templateDetail!=null?(
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Grid container >
                        <Grid item sm={3} md={3} lg={3}>
                            {templateDetail.template.functions.length!=0?
                                <TreeView
                                expanded={expanded}
                                
                                >
                                    {renderTreeNodes(templateDetail.template.functions)}
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
                                    selectedFunction.assignTo!=null?
                                    (   <>
                                        <Grid md={4} sm={12}>
                                            <h4>Employee Id:</h4> {selectedFunction.assignTo.employee_id}
                                        </Grid>
                                        <Grid md={4} sm={12}>
                                            <h4>Employee Name:</h4> {selectedFunction.assignTo.name}
                                        </Grid>
                                        </>
                                    ):('')
                                }
                                {
                                    selectedFunction.responsibility!=null?
                                    (   <>
                                        <Grid md={4} sm={12}>
                                            <h4>Responsibility:</h4> {selectedFunction.responsibility.name}
                                        </Grid>
                                        
                                        </>
                                    ):('')
                                }


                                <Grid md={4} sm={12}>
                                    <h4>Assigned On:</h4> {extract_date(selectedFunction.createdAt)}
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
                ):
                'Loading'
            }
        </MainCard>
        </>
    )
}
