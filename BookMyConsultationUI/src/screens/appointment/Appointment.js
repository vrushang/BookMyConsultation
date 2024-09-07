import React, { Fragment,useState} from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import RateAppointment from './RateAppointment';
import Modal from 'react-modal';
const Appointment = (props) => {

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
    const [ratingParameter, setRatingParameter] = useState({
        "appointmentId": "",
        "doctorId": ""
    });
    const onHandleButton = (list) => {
        const state = ratingParameter;
        state['appointmentId']= list.appointmentId;
        state['doctorId']= list.doctorId;
        // setRatingParameter({
        //     ['appointmentId']: list.appointmentId,
        //     ['doctorId']: list.doctorId,
        // });
    setRatingParameter({...state});
        console.log("appointmentId" +ratingParameter.appointmentId);
        console.log("appointmentId" +list.appointmentId);
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
                     <RateAppointment  items={props.items} ratingParameter={ratingParameter} accessToken={props.accessToken} userField={props.userField} closeModal={closeModal}/>
                </Modal>
            </div>

        {props.items.map((list)=>{
            return(
                <Paper style={{ padding: 20, margin: 15, textAlign: 'left', cursor: "pointer" }}>

                <Typography component="div" variant="h6">Dr:{list.doctorName}</Typography>
                <Typography component="div">Date:{list.appointmentDate}</Typography>
                <Typography component="div">Symptoms:{list.symptoms} </Typography>
                <Typography component="div">PriorMedicalHestory:{list.priorMedicalHistory}</Typography>
                <Typography>
                    <Button onClick={()=>onHandleButton(list)}  style={{ marginTop: 20, textAlign: 'left' }} variant="contained" color="primary">
                        RATE APPOINTMENT
                    </Button>
                </Typography>
            </Paper>
            )
        })}
        </Fragment>
    )
}

export default Appointment;