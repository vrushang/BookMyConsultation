import React, { Fragment,useState } from 'react';
import { FormControl, Button, Card, CardContent, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import {postRatingwithCommets} from '../../util/fetch';
const RateAppointment = (props) => {
     const [value, setValue] = React.useState(0);
    const[ratingObj1, setRatingObj1] = useState({
        "appointmendId": "",
        "doctorId":"",
        "comments": "",
        "rating": 0, 
    });

    const onHandleFormSubmit = (e) => {
        e.preventDefault();
        console.log(value);
        const state = ratingObj1;
        state["rating"] = value;
        setRatingObj1({...state})
        postRatings();
        props.closeModal();
        console.log(props.ratingParameter);
        console.log(ratingObj1);
    }

    const handleChange = (e) => {
        // setTimeSlot(event.target.value);
        const state = ratingObj1;
        state[e.target.name] = e.target.value;
        state["appointmentId"]=props.ratingParameter.appointmentId;
        state["doctorId"] = props.ratingParameter.doctorId;
        setRatingObj1({ ...state });
    };

     //Post Ratings //
    async function postRatings() {
 
        try{
            const response =await postRatingwithCommets(ratingObj1,props.accessToken);
            // .then(function (response) {
                // console.log('Authenticated' +response);
                const result =await response.data;
                console.log("Result POST RATING: " +result);
                // accessToken = doctorsList.accessToken;
            }catch(error) {
                console.log('Error in booking appointment' + error);
            };

    }
    //Post Ratings ended//

    return (
        <Fragment>
            <Card style={{
                width: 600,
                padding:11,
                color:"white"
            }}>
                <CardContent style={{ backgroundColor: "#6d026d" }}>
                    <Typography
                        variant="h6"
                        style={{ color: "wheat" }}
                        gutterBottom
                    >
                        Rate an Appointment
                    </Typography>
                </CardContent>
                <FormControl>
                    <FormControl style={{ margin: 15 }} variant="standard" xs={12} sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                            id="comments"
                            label="Comments"
                            multiline
                            rows={4}
                            name="comments"
                            // onChange={handleChange}
                            onChange={handleChange}
                            value={ratingObj1.comments}
                            // defaultValue="Default Value"
                            variant="standard"
                        />
                    </FormControl>
                    <FormControl style={{ margin: 15 }} variant="standard" xs={12} sx={{ m: 2, minWidth: 120 }}>
                        <Typography component="legend">Controlled</Typography>
                        <Rating
                            id='ratings'
                            name="ratings"
                            value={value}
                            onChange={(e,val)=>{
                                setValue(val);
                               
                                
                            }}
                        />
                    </FormControl>
                    <FormControl style={{ margin: 15 }} variant="standard" xs={12} sx={{ m: 2, minWidth: 120 }}>
                        <Button
                        onClick={onHandleFormSubmit}
                            //   style={{ marginLeft: 35, width: 250, fontSize: 12 }} 
                            variant="contained" color="primary">
                            RATE APPOINTMENT
                        </Button>
                    </FormControl>
                  
                </FormControl>
            </Card>
        </Fragment>
    )
}

export default RateAppointment;