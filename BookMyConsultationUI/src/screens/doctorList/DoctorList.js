import React, { Fragment, useState, useEffect } from 'react';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import Modal from 'react-modal';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getListOfDoctors,getDoctorById } from '../../util/fetch';

const DoctorList = (props) => {

    const [doctorsList, setDoctorsList] = useState([]);
    useEffect(() => {
        function doctorListAPI() {
            try {
                const response = getListOfDoctors();
                const result = response.data;
                setDoctorsList(result);

            } catch (error) {
                console.log('Error in doctorList' + error);
            };
        }
        // doctorListAPI();
        if (doctorsList.length = 0) {
            doctorListAPI();
        } else {
            setDoctorsList(props.doctorsList);
        }

    }, []);

    let renderFullStars = (rating) => {
        return Array(rating)
            .fill(1)
            .map((item, i) => {
                return (
                    <FontAwesomeIcon icon={faStar} size="1x" color="orange" />

                )
            })
    }


    const [field, setField] = useState(
        {
            firstName: '',
            lastName: '',
            speciality: '',
            dob: '',
            city: '',
            email: '',
            mobile: '',
            rating: '',
            totalYearsOfExp: ''
        }
    )

    async function doctorListByIdAPI(id) {
        try{
        const response = await getDoctorById(id);
        console.log(response);
                const result = response.data;
                console.log(result.firstName);
                setField({
                    ['firstName']: result.firstName,
                    ['lastName']: result.lastName,
                    ['speciality']: result.speciality,
                    ['dob']: result.dob,
                    ['city']: result.address.city,
                    ['email']: result.emailId,
                    ['mobile']: result.mobile,
                    ['rating']: result.rating,
                    ['totalYearsOfExp']: result.totalYearsOfExp
                });
            }catch(error) {
                console.log('Error in doctorList' + error);
            };
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectButton, setSelectButton] = useState(0);
    const [doctorDetailsProps, setDoctorDetailsProps] = useState({
        "doctorId": "",
        "doctorName": "",
    });

   
    const onHandleButton = (id, data) => {
        console.log(data);
        setSelectButton(id);
        setDoctorDetailsProps({
            "doctorId": data.id,
            "doctorName": data.firstName
        })
        doctorListByIdAPI(data.id);
        openModal();
    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    Modal.setAppElement('#root');
    return (
        <Fragment>

            <div>
                {/* model to display login and registration form with tabs  */}
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    {selectButton == 0 ? <BookAppointment closeModal={closeModal}
                        doctorDetailsProps={doctorDetailsProps}
                        accessToken={props.accessToken}
                        userField={props.userField}
                        items={props.items}
                        setItems={props.setItems} />
                        : <DoctorDetails field={field} />}

                </Modal>
            </div>

            {doctorsList.slice(0, 5).map((list) => {
                return (
                    <Paper key={list.id} style={{ width: 600, height: 160, margin: "auto", marginTop: 20, textAlign: 'left' }}>
                        <Typography style={{ marginBottom: 20, marginLeft: 20 }} variant="h6">Doctor Name:{list.firstName}</Typography>
                        <Typography style={{ marginLeft: 20 }} component="div">Speciality: {list.speciality} </Typography>
                        <Typography style={{ marginBottom: 10, marginLeft: 20 }} component="div">rating: {renderFullStars(list.rating)}</Typography>

                        <Grid container spacing={24}>
                            <Grid item xs={6} >
                                <Typography>
                                    <Button onClick={() => onHandleButton(0, list)} style={{ marginLeft: 35, width: 250, fontSize: 12 }} variant="contained" color="primary">
                                        BOOK APPOINTMENT
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography>
                                    <Button onClick={() => onHandleButton(1, list)} style={{ marginLeft: 0, width: 250, fontSize: 12, background: "#228B22", color: "white" }} variant="contained">
                                        VIEW DETAILS
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )

            })}

        </Fragment>
    )
}

export default DoctorList;
