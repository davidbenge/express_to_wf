// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import React, { useState, useEffect } from "react";
import {ComboBox, Item, Button, defaultTheme, Provider, Text} from '@adobe/react-spectrum'
import UploadToCloud from '@spectrum-icons/workflow/UploadToCloud';
import axios from "axios";
import "./App.css";
import ProjectAdd from "@spectrum-icons/workflow/ProjectAdd";
import { getWfLoginCallUrl } from "../utils/runmodeConfigUtil";

const App = ({ addOnUISdk }) => {
    const [buttonLabel, setButtonLabel] = useState("Click me");
    const [userAuthToken,setUserAuthToken] = useState(null);
    const [wfUser,setWfUser] = useState(null);
    const tempProtocalHostPath = `https://bilbroug-18052301.testdrive.workfront.com`;
    //const pathGetUsersInfo = `https://bilbroug-18052301.testdrive.workfront.com/attask/api/v17.0/login`;
    //const pathGetUsersTasks = `https://bilbroug-18052301.testdrive.workfront.com/attask/api/v17.0/task/search?assignmentsUsersMM:ID=64779f11000dd9e15473cf32764f8c93&assignmentsUsersMM:ID_Mod=in&project:statusEquatesWith=CUR`;

    addOnUISdk.ready.then(async () => {
        const authToken = await addOnUISdk.app.currentUser.accessToken();
        console.log("got authToken",authToken);
        if(authToken){
            setUserAuthToken(authToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        }
    });

    useEffect(() => {
        if(userAuthToken){
            async function fetchData() {
                console.log("getting users info");
                const usersInfo = await getUsersInfo(userAuthToken);
                console.log("called getUsersInfo",JSON.stringify(usersInfo, null, 2));
                setWfUser(usersInfo);
            };
            fetchData();
        };
    },[userAuthToken])

    /*
    useEffect(() => {
        async function fetchData() {
            console.log("getting access token");
            const authToken = await addOnUISdk.app.currentUser.accessToken();
            setUserAuthToken(authToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
        }
        fetchData();
    },[])
    */

    useEffect(() => {
        if(wfUser){
            //when userAuthToken is updated do this
        console.log("wfUser updated but doing nothing yet. will be fetching tasks here", wfUser);
        };
    },[wfUser])

    const getUsersInfo = async (userAuthToken) => {
        const callUrl = getWfLoginCallUrl(tempProtocalHostPath);
        try {
            const response = await axios({
                url: callUrl,
                method: 'GET',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    function handleClick() {
        setButtonLabel("Clicked");
    }

    return (
        <Provider theme={defaultTheme}>
            <div className="container">
                <ComboBox label="Workfront instance:" isRequired necessityIndicator="icon" selectedKey="123" id="cbWfInstance">
                    <Item key="123" >Swains World</Item>
                </ComboBox>
                <ComboBox label="Link output to task:" isRequired necessityIndicator="icon" selectedKey="1" id="cbTaskSelection">
                    <Item key="1" >123: Build banner add</Item>
                </ComboBox>
                <ComboBox label="Express output format:" isRequired necessityIndicator="icon" selectedKey="1" id="cbOutputFormat">
                    <Item key="1" >PNG</Item>
                    <Item key="1" >JPEG</Item>
                </ComboBox>
            </div>
            <div className="container">
                <Button onClick={handleClick} id="buttonSendToWf" >
                    <UploadToCloud/>
                    <Text>Send to Workfront</Text>
                </Button>
            </div>
            <div className="container">
                <Button onClick={handleClick} id="buttonOpenRequest" >
                    <ProjectAdd/>
                    <Text>Open New Request</Text>
                </Button>
            </div>
        </Provider>
    );
};

export default App;
