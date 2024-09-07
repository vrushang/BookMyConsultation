import React, { Fragment, useState} from 'react';

import './Header.css';
import logo from '../../assets/logo.jpeg';
import { Button, AppBar, Toolbar, Grid, Typography, Tab, Tabs,Card,CardContent } from '@material-ui/core';
import Modal from 'react-modal';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import {logout} from '../../util/fetch';
const Header = (props) => {

    // const [loginDetails, setLoginDetails] = useState([])
    // useEffect(() => {
        // Update the document title using the browser API
        // props.postLogin();
    // }, []);

    function TabsComponent(props) {
        const [value, setValue] = useState(0);
        const handleTabs = (e, val) => {
            setValue(val);
        }

        return (
            <div>
                <CardContent style={{ backgroundColor: "#6d026d" }}>
                    <Typography
                        variant="h6"
                        style={{ color: "wheat" }}
                        gutterBottom
                    >
                        Authentication
                    </Typography>
            </CardContent>
                <Tabs value={value} onChange={handleTabs}>
                    <Tab label="LOGIN" />
                    <Tab label="REGISTER" />
                </Tabs>
                <TabPanel value={value} index={0} accessToken={props.accessToken} setAccessToken={props.setAccessToken} items={props.items} setItems={props.setItems} userField={props.userField} setUserField={props.setUserField}></TabPanel>
            </div>
        )
    }

    async function logoutFunc(){
        try {
           logout(props.accessToken);
            props.setAccessToken("");
            localStorage.clear();
            console.log("logout successful");
        }catch(error) {
            console.log('Error on Authentication' + error);
        };
    }

    function TabPanel(props) {
        const { value, index, accessToken, setAccessToken,items,setItems,userField,setUserField} = props;
        return (
            <div>
                {value === index && value === 0 ?
                    <Login accessToken={accessToken} setAccessToken={setAccessToken} closeModal={closeModal} items={items} setItems={setItems} userField={userField} setUserField={setUserField}/> :
                    <Register />}
            </div>
        )
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
                    
                    <TabsComponent accessToken={props.accessToken} setAccessToken={props.setAccessToken} items={props.items} setItems={props.setItems} userField={props.userField} setUserField={props.setUserField}/>


                </Modal>
            </div>

            <AppBar position="static">
                <Toolbar className="header">
                    <Grid container spacing={20}>
                        <Grid item xs={0}>
                            <Typography type="title">
                                <img src={logo} alt="logo" className="logoimg"></img>
                            </Typography>
                        </Grid>

                        <Grid item xs={9}>
                            <Typography style={{ marginLeft: 10, color: 'white' }} variant="h6" component="div">
                                Doctor Finder
                            </Typography>
                        </Grid>


                        <Grid item xs={1}>
                            <div className="btn">
                               {props.accessToken == "" ?

                                    <Button
                                    style={{width:80 }} 
                                        onClick={openModal}
                                        color="primary" variant="contained">
                                        LOGIN
                                    </Button> :
                                    <Button onClick={logoutFunc} style={{width:80,backgroundColor:'#E52B50',color:'white'}} variant="contained" >
                                        LOGOUT
                                    </Button>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>

    )
}
export default Header;