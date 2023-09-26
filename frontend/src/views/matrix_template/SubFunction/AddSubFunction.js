import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useParams } from 'react-router';
import Alert from 'ui-component/Alert_SnackBar/Alert_SnackBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddSubFunction() {
    const { template_id } = useParams();
    const { parent_id } = useParams();
    const [functionName, setFunctionName] = useState('');
    const [depShortName, setDeptShortName] = useState('');
    const [stackHolders, setStackHolders] = useState([]);
    const [stackHolderNature, setStackHolderNature] = useState([]);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const handleNameField = (e) => {
        setFunctionName(e.target.value);
    };

    const handleChangeStackHolder = (index) => (e) => {
        let stackholderdata = [...stackHolders];
        stackholderdata[index][e.target.name] = e.target.value;
        setStackHolders(stackholderdata);
    };
    const handleChangeOrganization = (index) => async (e) => {
        let stackholderdata = [...stackHolders];
        stackholderdata[index][e.target.name] = e.target.value;
    
        var new_employees=await fetchEmployees(e.target.value);
        var new_department=await fetchDepartments(e.target.value);
        console.log(new_employees)
        console.log(new_department)
        let employee_data = [...employees];
        let department_data = [...departments];
        employee_data[index]=new_employees;
        department_data[index]=new_department;
        console.log(employee_data)
        console.log(department_data)
        setDepartments(department_data)
        setEmployees(employee_data)

        setStackHolders(stackholderdata);
    };

    const addstackHolders = () => {
        let Stack_holders = [...stackHolders];
        let employee_data = [...employees];
        let department_data = [...departments];
        Stack_holders.push({
            organization:'',
            stakeholderType: '',
            stakeholder: '',
            stackHolderNature: '',
        });
        department_data.push([]);
        employee_data.push([]);

        setStackHolders(Stack_holders);
        setEmployees(employee_data);
        setDepartments(department_data);
    };

    const removeField = (index) => {
        let Stack_holders = [...stackHolders];
        Stack_holders.splice(index, 1);
        setStackHolders(Stack_holders);
    };

    const submitaddform = () => {
        if (functionName.length !== 0) {
            axios
                .post(process.env.REACT_APP_BACKEND_URL + 'functions/', {
                    name: functionName,
                    parent_template_id:template_id,
                    parent_function_id:parent_id,
                    stackholders: stackHolders,
                })
                .then((response) => {
                    if (!response.data.error) {
                        setMsg(response.data.message);
                        setMsgType('success');
                        handleClick();
                        setFunctionName('');
                        setStackHolders([]);
                    } else {
                        setMsg(response.data.message);
                        setMsgType('error');
                        handleClick();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setMsg(err.response.data.message);
                    setMsgType('error');
                    handleClick();
                });
        }
    };

    const handleClick = () => {
        setOpenSnackBar(true);
    };

    const handleSnackClose = () => {
        setOpenSnackBar(false);
    };

    useEffect(() => {
        fetchStakeHolderNature();
        fetchOrganizations();
    }, []);

    function fetchOrganizations() {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'organization/').then((response) => {
            console.log(response.data)
            setOrganizations(response.data);
            
        });
    }
    function fetchStakeHolderNature() {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'stakeholder/').then((response) => {
            if (!response.data.error) {
                setStackHolderNature(response.data);
            } else {
                console.error('Error fetching stakeholder nature');
            }
        });
    }
    async function fetchEmployees(org_id) {
        var emp=await axios.get(process.env.REACT_APP_BACKEND_URL + 'employee/organization_employees/'+org_id);
        return emp.data;
    }
    async function fetchDepartments(org_id) {
        var department= await axios.get(process.env.REACT_APP_BACKEND_URL + 'department/organization/'+org_id);
        return department.data;
    }

    return (
        <MainCard title="Add Sub Function">
            <Alert openSnackBar={openSnackBar} handleClose={handleSnackClose} msgType={msgType} msg={msg} />
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid xs={12} md={6} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Sub Function Name"
                        variant="outlined"
                        onChange={handleNameField}
                        value={functionName}
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                    <Button sx={{ float: 'right', backgroundColor: '#5e35b1' }} variant="contained" onClick={addstackHolders}>
                        Add StackHolders
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {stackHolders.map((stackholder, index) => (
                        <Grid container sx={{ marginTop: '20px' }} key={index}>
                            <Grid item md={2} xs={12} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id={`stackholder-type-label-${index}`}>Organization</InputLabel>
                                    <Select
                                        labelId={`stackholder-type-label-${index}`}
                                        id={`stackholder-type-select-${index}`}
                                        value={stackholder.organization}
                                        label="Organization"
                                        name={`organization`}
                                        onChange={handleChangeOrganization(index)}
                                    >
                                        {
                                            organizations.map((organization)=>{
                                                return (
                                                    <MenuItem value={organization._id}>{organization.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={2} xs={12} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id={`stackholder-type-label-${index}`}>StackHolder Type</InputLabel>
                                    <Select
                                        labelId={`stackholder-type-label-${index}`}
                                        id={`stackholder-type-select-${index}`}
                                        value={stackholder.stakeholderType}
                                        label="Stack Holder Type"
                                        name={`stakeholderType`}
                                        onChange={handleChangeStackHolder(index)}
                                    >
                                        <MenuItem value={'Employee'}>Employee</MenuItem>
                                        <MenuItem value={'Department'}>Department</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {stackholder.stakeholderType === 'Employee' && (
                                <Grid item md={2} xs={12} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id={`employee-label-${index}`}>Employee</InputLabel>
                                        <Select
                                            labelId={`employee-label-${index}`}
                                            id={`employee-select-${index}`}
                                            value={stackholder.stakeholder}
                                            label="Employee"
                                            name={`stakeholder`}
                                            onChange={handleChangeStackHolder(index)}
                                        >
                                            {
                                            employees[index].map((employee)=>{
                                                return (
                                                    <MenuItem value={employee._id}>{employee.name}</MenuItem>
                                                )
                                            })
                                        }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            {stackholder.stakeholderType === 'Department' && (
                                <Grid item md={2} xs={12} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id={`department-label-${index}`}>Departments</InputLabel>
                                        <Select
                                            labelId={`department-label-${index}`}
                                            id={`department-select-${index}`}
                                            value={stackholder.stakeholder}
                                            label="Departments"
                                            name={`stakeholder`}
                                            onChange={handleChangeStackHolder(index)}
                                        >
                                            {
                                            departments[index].map((department)=>{
                                                return (
                                                    <MenuItem value={department._id}>{department.name}</MenuItem>
                                                )
                                            })
                                        }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            <Grid item md={2} xs={12} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id={`stackholder-nature-label-${index}`}>StackHolder Nature</InputLabel>
                                    <Select
                                        labelId={`stackholder-nature-label-${index}`}
                                        id={`stackholder-nature-select-${index}`}
                                        value={stackholder.stackholderNature}
                                        label="Stack Holder Nature"
                                        name={`stackHolderNature`}
                                        onChange={handleChangeStackHolder(index)}
                                    >
                                        {stackHolderNature.map((nature) => (
                                            <MenuItem key={nature._id} value={nature._id}>
                                                {nature.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <CloseIcon
                                    sx={{ color: 'red', fontSize: '30px', marginTop: '10px', marginLeft: '10px' }}
                                    onClick={() => {
                                        removeField(index);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid display="flex" justifyContent="center" alignItems="center" container>
                    <Button variant="contained" sx={{ backgroundColor: '#5e35b1', marginTop: '50px' }} onClick={submitaddform}>
                        {'Add Sub Function'}
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
}
