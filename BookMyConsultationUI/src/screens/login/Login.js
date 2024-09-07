import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { login } from '../../util/fetch';
import {getListOfAppointments} from '../../util/fetch';
import {getUserById} from '../../util/fetch';
const Login = (props) => {
    const { userField, setUserField, accessToken, setAccessToken, closeModal, items, setItems } = props;

    //Get User Object post login code ended//
    async function UserByIdAPI(id, accessToken) {
        try{
        console.log(id);
        console.log(accessToken);
       
        // calling userby id;
            const response = await getUserById(id,accessToken);

                const result = await response.data;
                console.log(result);

                setUserField({
                    ['firstName']: result.firstName,
                    ['lastName']: result.lastName,
                    ['dob']: result.dob,
                    ['email']: result.emailId,
                    ['mobile']: result.mobile,
                    ['createdAt']: result.createdAt,
                });
            }catch(error) {
                console.log('Error in doctorList' + error);
            };
    }

    const [loginData, setLoginData] = useState({
        id: 0,
        email: "",
        password: ""
    });

const [error,setError] = useState("");

    const onHandleFormSubmit = (e) => {
        console.log(loginData);
        postLogin();
    }

    const handleChangeHandler = (e) => {
        const state = loginData;
        console.log(loginData);
        state[e.target.name] = e.target.value;
        setLoginData({ ...state });
    }


    async function postLogin() {

        try {
            var uname = loginData.email;
            var pass = loginData.password;
            //calling login Api
            const response = await login(uname,pass); 
            const result = await response.data;
            //extra
            localStorage.setItem("userId",result.id);
            var accessToken = await result.accessToken;
            localStorage.setItem('accessToken', "");
            localStorage.setItem('accessToken', accessToken);
            setAccessToken(accessToken);
            closeModal();
            console.log('Authenticated' + JSON.stringify(response));
            UserByIdAPI(uname, accessToken);

         
            const getAppontmentResponse = await getListOfAppointments(result.id,accessToken);
            console.log(getAppontmentResponse);
            let listOfData = await getAppontmentResponse.data;
            console.log(listOfData);

            setItems(listOfData);
 


        }
        catch (error) {
            console.log('Error on Authentication' + error);
            // alert("please register first");
            setError("please register");
        };

    }

    return (
        <Grid container direction="column" alignItems="center" justify="center" >
            <ValidatorForm
                onSubmit={onHandleFormSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    variant="standard"
                    label="Email"
                    onChange={handleChangeHandler}
                    name="email"
                    value={loginData.email}
                    validators={['required','isEmail']}
                    errorMessages={['Please fill out this field',"Enter a valid email"]}
                />
                <TextValidator
                    variant="standard"
                    label="Password"
                    onChange={handleChangeHandler}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['Please fill out this field']}
                    value={loginData.password}
                />
                <br /><br />
             <div style={{color:"red",marginLeft:40,marginBottom:20}}>{error}</div>
                <Button style={{ marginLeft: 50 }} variant="contained" color="primary" type="submit">
                    LOGIN
                </Button>

            </ValidatorForm>
        </Grid>


    )
}

export default Login;