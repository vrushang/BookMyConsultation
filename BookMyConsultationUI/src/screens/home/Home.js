import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../common/header/Header';
import { Tabs, Tab, AppBar, Typography } from '@material-ui/core';
import TabContainer from '../../common/tabContainer/TabContainer';
import DoctorList from '../doctorList/DoctorList';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Appointment from '../appointment/Appointment';
import { getListOfDoctorsWithSpeciality } from "../../util/fetch";

const Home = (props) => {
    const [value, setValue] = useState(0);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
    const [items, setItems] = useState([]);

    const handleTabs = (e, val) => {
        setValue(val);
    }
    //Get User OBJECT post Login code//

    const [userField, setUserField] = useState(
        {
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            mobile: '',
            createdAt: ''
        }
    )

    const [speciality, setSpeciality] = React.useState('');

    const handleChange = (event) => {
        // setSpeciality(event.target.value);
        console.log(event.target.value);
        switch (event.target.value) {
            case 1:
                setSpeciality("CARDIOLOGIST");
                break;
            case 2:
                setSpeciality("GENERAL_PHYSICIAN");
                break;
            case 3:
                setSpeciality("DENTIST");
                break;
            case 4:
                setSpeciality("PULMONOLOGIST");
                break;
            case 5:
                setSpeciality("ENT");
                break;
            case 6:
                setSpeciality("GASTRO");
                break;
            case "":
                setSpeciality("");
        }
    };

    const [doctorsList, setDoctorsList] = useState([]);
    useEffect(() => {
      async function doctorListAPI() {       
            try {
                const response = await getListOfDoctorsWithSpeciality(speciality,accessToken);
                const result =await response.data;
                setDoctorsList(result);
            } catch (e) {
                console.log('Error in doctorList' + e);
            };
        }
        doctorListAPI();
    }, [speciality]);

    useEffect(() => {
        // {accessToken == "" ? <div style={{ marginTop: 30 }}>Login to see appointments</div> 
        <Appointment accessToken={accessToken} items={items} />
        console.log(items)
    }
        , [items]);


    function TabPanel(props) {
        const { value, index } = props;
        return (
            <div>
                {value === index && value === 0 ?
                    <TabContainer>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <Typography style={{ marginTop: 30, textAlign: "left" }} component="div">
                                Select Speciality:
                            </Typography>
                            <Select
                                labelId="spcialistList"
                                id="spcialistList"
                                value={speciality}
                                onChange={handleChange}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>CARDIOLOGIST</MenuItem>
                                <MenuItem value={2}>GENERAL_PHYSICIAN</MenuItem>
                                <MenuItem value={3}>DENTIST</MenuItem>
                                <MenuItem value={4}>PULMONOLOGIST</MenuItem>
                                <MenuItem value={5}>ENT</MenuItem>
                                <MenuItem value={6}>GASTRO</MenuItem>
                            </Select>
                        </FormControl>

                        <DoctorList doctorsList={doctorsList} accessToken={accessToken} userField={userField} items={items} setItems={setItems} />

                    </TabContainer> :

                    <TabContainer>

                        {accessToken == "" ? <div style={{ marginTop: 30 }}>Login to see appointments</div> : <Appointment accessToken={accessToken} items={items} />}
                    </TabContainer>}
            </div>
        )
    }

    return (
        <Fragment>
            <Header
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                items={items}
                setItems={setItems}
                userField={userField}
                setUserField={setUserField}
            />
            <AppBar position="static" color="default" >
                <Tabs inkBarStyle={{ background: 'blue' }} TabIndicatorProps={{ style: { backgroundColor: "#4169E1" } }} value={value} onChange={handleTabs}>
                    <Tab style={{ minWidth: "50%" }} label="DOCTORS" />
                    <Tab style={{ minWidth: "50%" }} label="APPOINMENTS" />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}></TabPanel>

        </Fragment>
    )
}



export default Home;