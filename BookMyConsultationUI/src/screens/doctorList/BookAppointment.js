import React, { Fragment } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { getAppointmentById, postAppointments } from '../../util/fetch';
const BookAppointment = (props) => {
   
    async function postBookAppointment() {
        try {
            const response = await postAppointments(props.accessToken, appointment);
            const result = await response.data;
            getAppointmentByIdApi(result);
        }
        catch (e) {
            console.log('Error in booking appointment' + e);
            alert("please login to Book an appointment");
        };
    }

    const [value, setValue] = React.useState(new Date());

    const [appointment, setAppointment] = React.useState({
        "doctorId": props.doctorDetailsProps.doctorId,
        "doctorName": props.doctorDetailsProps.doctorName,
        "userId": props.userField.email,
        "userEmailId": props.userField.email,
        "userName": props.userField.firstName + " " + props.userField.lastName,
        "timeSlot": "",
        "status": "",
        "appointmentDate": "",
        "priorMedicalHistory": "",
        "symptoms": "",
        "createdDate": new Date()
    })
    async function getAppointmentByIdApi(id) {
        const getAppontmentResponse = await getAppointmentById(id, props.accessToken);
        let data = await getAppontmentResponse.data;
        props.setItems((res) => [...res, data])


    }



    const onHandleFormSubmit = (e) => {
        appointment["appointmentDate"] = value;
        e.preventDefault();
        postBookAppointment();
        props.closeModal();
        console.log(appointment);
    }

    const handleChange = (e) => {
        // setTimeSlot(event.target.value);
        const state = appointment;
        state[e.target.name] = e.target.value;
        setAppointment({ ...state });

    };
    const divStyle = {
        overflowY: 'scroll',
        height: '85vh',
        width: 600,
    };
    return (
        <Fragment>

            <Card style={divStyle}>
                <CardContent style={{ backgroundColor: "#6d026d" }}>
                    <Typography
                        variant="h6"
                        style={{ color: "wheat" }}
                        gutterBottom
                    >
                        Book an Appointment
                    </Typography>
                </CardContent>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>

                        <FormControl>

                            <FormControl variant="standard" xs={12}
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <TextField
                                    id="standard-read-only-input"
                                    label="DoctorId"
                                    // defaultValue="Hello World"
                                    name="doctorId"
                                    value={appointment.doctorId}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl variant="standard" xs={12}
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <TextField
                                    id="standard-read-only-input"
                                    label="DoctorName"
                                    name="doctorName"
                                    // defaultValue="Hello World"
                                    value={appointment.doctorName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl variant="standard" xs={12}
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <TextField
                                    id="standard-read-only-input"
                                    label="UserId"
                                    name="userId"
                                    // defaultValue="Hello World"
                                    value={appointment.userId}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl variant="standard" xs={12}
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <TextField
                                    id="standard-read-only-input"
                                    label="UserEmailId"
                                    name="userEmailId"
                                    // defaultValue="Hello World"
                                    value={appointment.userEmailId}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl variant="standard" xs={12}
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <TextField
                                    id="standard-read-only-input"
                                    label="UserName"
                                    name="userName"
                                    // defaultValue="Hello World"
                                    value={appointment.userName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl variant="standard" xs={12}
                                sx={{ m: 1, minWidth: 120, }}
                            >
                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DatePicker

                                        variant="inline"
                                        inputVariant="standard"
                                        views={['day', 'month', 'year']}
                                        label="Date picker inline"
                                        name="appointmentDate"
                                        value={appointment.appointmentDate}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider> */}

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <DatePicker

                                        variant="inline"
                                        inputVariant="standard"
                                        views={['day', 'month', 'year']}
                                        label="Date picker inline"
                                        name="appointmentDate"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        // onChange={appointmentDateSetter(value)}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>



                            </FormControl>

                            <FormControl variant="standard" xs={12} sx={{ m: 1, minWidth: 120 }} error>
                                <InputLabel id="timeSlot">TimeSlot</InputLabel>
                                <Select
                                    // labelId="timeSlot"
                                    id="timeSlot"
                                    name="timeSlot"
                                    value={appointment.timeSlot}
                                    // onChange={handleChange}
                                    onChange={handleChange}
                                // label="TimeSLot"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    <MenuItem value={"10AM-11AM"}>10AM-11AM</MenuItem>
                                    <MenuItem value={"11AM-12AM"}>11AM-12AM</MenuItem>
                                    <MenuItem value={"12AM-01PM"}>12AM-01PM</MenuItem>
                                    <MenuItem value={"05PM-06PM"}>05PM-06PM</MenuItem>
                                    <MenuItem value={"06PM-07PM"}>06PM-07PM</MenuItem>
                                    <MenuItem value={"07PM-08PM"}>07PM-08PM</MenuItem>
                                    <MenuItem value={"08PM-09PM"}>08PM-09PM</MenuItem>

                                </Select>
                                <FormHelperText>Select a time slot</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" xs={12} sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    id="medicalHistory"
                                    label="Medical History"
                                    name="priorMedicalHistory"
                                    multiline
                                    rows={4}
                                    value={appointment.priorMedicalHistory}
                                    // defaultValue="Default Value"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl variant="standard" xs={12} sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    id="symptoms"
                                    label="Symptoms"
                                    multiline
                                    rows={4}
                                    name="symptoms"
                                    value={appointment.symptoms}
                                    placeholder="ex:Cold,Swlling, etc."
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl variant="standard" xs={12} sx={{ m: 1, minWidth: 120 }}>
                                <Button
                                    //   style={{ marginLeft: 35, width: 250, fontSize: 12 }} 
                                    variant="contained" color="primary" onClick={onHandleFormSubmit}>
                                    BOOK APPOINTMENT
                                </Button>
                            </FormControl>
                        </FormControl>
                    </div>
                </Box>
            </Card>
        </Fragment>

    )

}

export default BookAppointment;