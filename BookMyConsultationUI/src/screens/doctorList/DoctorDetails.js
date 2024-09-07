import React, { Fragment } from 'react';
import { Card, CardContent, Typography, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from '@fortawesome/free-solid-svg-icons'


const DoctorDetails = (props) => {
    let renderFullStars = () => {
        var rating = props.field.rating;
        console.log(rating);
        return Array(rating)
            .fill(1)
            .map((item, i) => {
                return (
                    <FontAwesomeIcon icon={faStar} size="1x" color="orange" />

                )
            })
    }
    return (
        <Fragment>
            <Card style={{
                width: 300,
                boxShadow: "none"
            }}>
                <CardContent style={{ height: 20, padding: 20, marginLeft: 15, marginTop: 15, marginRight: 15, cursor: "pointer", backgroundColor: "#6d026d" }}>
                    <Typography
                        variant="h6"
                        style={{ color: "wheat" }}
                        gutterBottom
                    >
                        Doctor Details
                    </Typography>
                </CardContent>
                <Paper style={{ padding: 20, marginLeft: 15, marginRight: 15, textAlign: 'left', cursor: "pointer" }}>
                    {/* {console.log(props.field.firstName)} */}
                    <Typography component="div">Dr:{props.field.firstName} {props.field.lastName}</Typography>
                    <Typography component="div">Total Experience: {props.field.totalYearsOfExp} years </Typography>
                    <Typography component="div">Speciality:{props.field.speciality}</Typography>
                    <Typography component="div">Date Of Birth:{props.field.dob}</Typography>
                    <Typography component="div">City:{props.field.city}</Typography>
                    <Typography component="div">Email:{props.field.email}</Typography>
                    <Typography component="div">Mobile:{props.field.mobile}</Typography>
                    <Typography component="div">Rating:{renderFullStars()}</Typography>

                </Paper>
                <CardContent>

                </CardContent>

            </Card>
        </Fragment>
    )
}

export default DoctorDetails;