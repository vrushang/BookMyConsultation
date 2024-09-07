import React, {useState } from 'react';
import { Button, AppBar, Toolbar, Grid, Typography, Tab, Tabs } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {register} from '../../util/fetch';
const Register = ()=>{
    const [registerData, setregisterData] = useState({

        id: 0,
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        mobile: "",
        salt: "salt",
        dob: "13-07-1999"
    });

    const registerUser = (registerData) => {
        try{
        const response= register(registerData);
        console.log("Registered Successfully "+JSON.stringify(response.data));
        const result = JSON.stringify(response.data);
        
        }catch(error) {
        console.log('Try Again' +error);
        };
    }


    const [content, setContent] = useState(false);

    const onHandleFormSubmit = (e) => {
        e.preventDefault();
        console.log("submited");
        setContent(true);
        console.log(registerData.emailId);
        // const email = registerData.email;
        // const pass = registerData.password;
        registerUser(registerData);
    }

    const handleChangeHandler = (e) => {
        const state = registerData;
        state[e.target.name] = e.target.value;
        setregisterData({ ...state });
    }
    return (
        <Grid container direction="column" alignItems="center" justify="center" >
            <ValidatorForm
                onSubmit={onHandleFormSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    variant="standard"
                    label="First Name"
                    onChange={handleChangeHandler}
                    name="firstName"
                    value={registerData.firstName}
                    validators={['required']}
                    errorMessages={['Please fill out this field']}
                />
                <TextValidator
                    variant="standard"
                    label="Last Name"
                    onChange={handleChangeHandler}
                    name="lastName"
                    value={registerData.lastName}
                    validators={['required']}
                    errorMessages={['Please fill out this field']}
                />
                <TextValidator
                    variant="standard"
                    label="EmailId"
                    onChange={handleChangeHandler}
                    name="emailId"
                    value={registerData.emailId}
                    validators={['required', 'isEmail']}
                    errorMessages={['Please fill out this field', 'Enter valid Email']}
                />
                <TextValidator
                    variant="standard"
                    label="Password"
                    onChange={handleChangeHandler}
                    name="password"
                    type="password"
                    value={registerData.password}
                    validators={['required']}
                    errorMessages={['Please fill out this field']}
                />
                
                <TextValidator
                    variant="standard"
                    label="mobile"
                    name="mobile"
                    onChange={handleChangeHandler}
                    maxLength={10}
                    validators={['required']}
                    errorMessages={['Please fill out this field']}
                    value={registerData.mobile}
                /><br /><br />
                {content === true ? <p>Register successful. please login!</p> : ""}
                <Button style={{ marginLeft: 50 }} variant="contained" color="primary" type="submit">
                    REGISTER
                </Button>
            </ValidatorForm>

        </Grid>

    )

}

export default Register;