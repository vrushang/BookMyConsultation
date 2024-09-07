import React from 'react';
import axios from 'axios';

export async function register(registerData){
    var session_url = 'http://localhost:8080/users/register';
    return axios.post(session_url, registerData);
}
export async function login(uname,pass){
    var session_url = 'http://localhost:8080/auth/login';
    return await axios.post(session_url, {}, {
        auth: {
            username: uname,
            password: pass
        }
    });
}

export async function logout(accessToken){
    var session_url = 'http://localhost:8080/auth/logout';
    axios.post(session_url,{},{ headers: { "Authorization": `Bearer ${accessToken}` } });
 
}

export async function postAppointments(accessToken,appointment){
    var api = 'http://localhost:8080/appointments/';
    return await axios.post(api, appointment, { headers: { "Authorization": `Bearer ${accessToken}` } })
     
}

export async function getListOfAppointments(id,accessToken){
    var appointmentApi = `http://localhost:8080/users/${id}/appointments`;

    return  await axios.get(appointmentApi, { headers: { "Authorization": `Bearer ${accessToken}` } });
}

export async function getAppointmentById(id,accessToken){
    var appointmentApi = `http://localhost:8080/appointments/${id}`;

    return await axios.get(appointmentApi,{ headers: { "Authorization": `Bearer ${accessToken}` } })
}
export async function getUserById(id,accessToken){
    var api = `http://localhost:8080/users/${id}`;

    return await axios.get(api, { headers: { "Authorization": `Bearer ${accessToken}` } });
}

export async function getListOfDoctorsWithSpeciality(speciality,accessToken){
    var api = `http://localhost:8080/doctors?speciality=${speciality}`;

    return await axios.get(api, { headers: { "Authorization": `Bearer ${accessToken}` } })
}
export async function getDoctorById(id){
    var api = `http://localhost:8080/doctors/${id}`;
   return axios.get(api);
}
export async function getListOfDoctors(){
    var api = 'http://localhost:8080/doctors';
    
    return await axios.get(api);
}

export async function postRatingwithCommets(ratingObj1,accessToken){
    var api = 'http://localhost:8080/rating';
    return await axios.post(api, ratingObj1, { headers: { "Authorization": `Bearer ${accessToken}` } })
}
