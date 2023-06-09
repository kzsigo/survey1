import logo from './images/logo2.png';
import headerImage from './images/doctors.png';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import ProductType from './components/ProductType.jsx'
import Conditions from './components/Conditions.jsx'
import Potency from './components/Potency.jsx'
import Weight from './components/Weight.jsx'
import Taste from './components/Taste.jsx'
import Results from './components/Results.jsx'
import Queue from './components/Queue.jsx';
import getTokenBody from './getToken.json'
import { useQuery } from '@tanstack/react-query';
import './scss/styles.scss';

function App() {
    //Hooks for Background Changer
    const [appStyle, setAppStyle] = useState("App");
    const [optionsDisplay, setOptionsDisplay] = useState(true);

    //To do: go through this, some of these were made for visbility for troubleshoot
    //const [token, setToken] = useState('')
    //const [CustomerID, setCustomerID] = useState()
    const [strainIDs, setStrainIDs] = useState([])
    const [SearchID, setSearchID] = useState()
    const [SearchIDs, setSearchIDs] = useState([])
    let searchIDsTemp = []
    //let resultsReady = false
    

    //const [hasResultInfo, setHasResultsInfo] = useState(false)
    const toggleOptionsDisplay = () => setOptionsDisplay(!optionsDisplay);
    const [displayConditions, setDisplayConditions] = useState(false)
    const [displayTastes, setDisplayTastes] = useState(false)
    const [displayProduct1, setDisplayProduct1] = useState(false)
    const [displayProduct2, setDisplayProduct2] = useState(false)
    const [displayWeight, setDisplayWeight] = useState(false)
    const [displayResult, setDisplayResult] = useState(false)

    //Compenent References for Auto scroll on button click
    const conditionsDivRef = useRef(null)
    const tastesDivRef = useRef(null)
    const potencyDivRef = useRef(null)
    const resultsDivRef = useRef(null)

    //Auto-scroll functions 
    const scrollToConditionsChild = () => {
        conditionsDivRef.current.scrollIntoView({behavior:'instant', block:'start'})
    }
    const scrollToTastesChild = () => {
        tastesDivRef.current.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    const scrollToPotencyChild = () => {
        potencyDivRef.current.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    const scrollToResultsChild = () => {
        resultsDivRef.current.scrollIntoView({ behavior: 'instant', block: 'start' })
    }

    //Get intial Toekn
    function fetchToken() {
        return axios.post
            (
                'https://ss.prestoapi.com/api/login',
                getTokenBody,
            )
            .then(res => res.data.token)
    }

    const { data: token, error } = useQuery({
        queryKey: ['token'],
        queryFn: fetchToken
    })


    //JSON
    //To do: Go through and see if all of these are still necessary, some have been made 
    //for troubleshooting
    const [searchAddRequestBodies, setSearchAddRequestBodies] = useState([])
    const [formInputData, setFormInputData] = useState({
        CustomerID: 0,
        searchName: "",
        WeightingProperty: 50,
        WeightingTaste: 50,
        WeightingSmell: 0,
        THCMin: 0,
        THCMax: 100,
        CBDMin: 0,
        CBDMax: 100,
        DominanceIDs: "",
        SpeciesIDs: "",
        ConditionIDs: "",
        SmellIDs: "",
        TasteIDs: "",
        StrainTypeIDs: [],
        ExcludedTerpeneIDs: "",
        DispensaryID: 2,
        Sharable: 1

    });
    const [searchRunRequestBody, setSearchRunRequestBody] = useState({
        "SearchID": 0,
        "MaxRows": 3
    })
    let searchRunRequestBodies = []
    const [runResults, setRunResults] = useState([
        {
            "StrainID": 0,
            "StrainTypeID": 0,
            "StrainType": "",
            "Strain": "",
            "SpeciesID": 0,
            "Species": "",
            "DominanceID": 0,
            "Dominance": "",
            "TotalTHC": 0,
            "TotalCBD": 0,
            "StrainScore": 0,
            "InStock": 0,
            "Price": 0,
            "Unit": ""
        }])
    const [analysisRequest, setAnalysisRequest] = useState({
        "SearchID": 0,
        "StrainID": 0,
        "ViewID": "raw",
        "MaxRows": 5
    })
    const [analysisResults, setAnalysisResults] = useState([{}])
    let runResultsList = []

    //Strain Type Next button
    //To Do: bring all other next functions here... right now the sendItem 
    //fucntions are created in the component..
    const handleFormSubmit = async (evnt) => {
        const checkEmptyInput = await !Object.values(formInputData).every(res => res === "")
        if (checkEmptyInput) {
            //TODO: Log this error somewhere? Do we need a user-friendly message when this error occurs?
            //where are we gonna log errors?
            console.log(formInputData)
        }
    }

    //Submit Button - in order of operation. 
    //To Do: make a single function to make API calls
    //To Do: Restructure this to make sense... some steps are unnecessary 
    //and was built for troubleshooting
    async function prepareAddRequestBody() {
        formInputData.StrainTypeIDs.map((StrainTypeIDs) => {
            let THCMax = 100
            let THCMin = 0

            if (StrainTypeIDs == 1 || StrainTypeIDs == 7) {
                THCMax = potency1[1]
            }
            else if (StrainTypeIDs == 2 || StrainTypeIDs == 6) {
                THCMax = potency2[1]
            }
            if (StrainTypeIDs == 1 || StrainTypeIDs == 7) {
                THCMin = potency1[0]
            }
            else if (StrainTypeIDs == 2 || StrainTypeIDs == 6) {
                THCMin = potency2[0]
            }
            let ConditionIDs = formInputData.ConditionIDs.toString()
            searchAddRequestBodies.push({ ...formInputData, StrainTypeIDs, THCMax, THCMin, ConditionIDs })
        }
        )
        console.log(searchAddRequestBodies)
    }
    async function makeAddRequests() {
        //Make first call
        console.log('token', token)
        try {
            const [firstRequestBody, ...restRequestBodies] = await searchAddRequestBodies
            async function searchAddResponse(requestBody) {
                const response = await axios.post
                    (
                        /*Request URL*/'https://ss.prestoapi.com/api/v1_searchadd',
                        /*Request Body*/requestBody,
                        /*Headers*/{
                            headers:
                            {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                return response.data
            }

            const runRequestBody = await searchAddResponse(firstRequestBody)
            let searchIDTemp = await runRequestBody[0].SearchID
            searchIDsTemp.push(searchIDTemp)
            const CustomerIDTemp = await runRequestBody[0].CustomerID

            await setSearchID(searchIDTemp)
            await setSearchRunRequestBody({ ...searchRunRequestBody, SearchID: searchIDTemp })
            let newBody = await { ...searchRunRequestBody, SearchID: searchIDTemp }
            await searchRunRequestBodies.push(newBody)

            //TEMP FOR DEMO
            setRunResults(searchRunRequestBodies)
            if (restRequestBodies.length > 0) {
                //make the rest of the calls
                for (const request of restRequestBodies) {
                    const body = await { ...request, CustomerID: CustomerIDTemp }
                    const res2 = await searchAddResponse(body, token)
                    searchIDTemp = await res2[0].SearchID
                    searchIDsTemp.push(searchIDTemp)
                    await searchRunRequestBodies.push({ ...searchRunRequestBody, SearchID: searchIDTemp})
                }
                setSearchIDs(searchIDsTemp)
                newBody = await { ...searchRunRequestBody, SearchID: searchIDTemp }
            }
            return searchRunRequestBodies
        } catch (err) {
            //TODO: Log this error somewhere? Do we need a user-friendly message when this error occurs?
            //where are we gonna log errors?
            console.log(err)
        }
    }
    async function makeRunRequest(requestBody) {
        const response = await searchRunResponse({ ...searchRunRequestBody, SearchID: requestBody.SearchID })
        return response
    }

    //Moved to Results Component
    async function searchRunResponse(requestBody) {
        const response = await axios.post
            (
                        /*Request URL*/'https://ss.prestoapi.com/api/v1_searchrun',
                        /*Request Body*/requestBody ,
                        /*Headers*/{
                    headers:
                    {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            );
        return await response.data
    }   
    async function prepareAnalysisRequestBody() {
        const strainIDsTemp = []
        await runResults.map((result) => {
            strainIDsTemp.push(result.StrainID)
        })
        await setStrainIDs(strainIDsTemp)
        const body = await { ...analysisRequest, SearchID: SearchID, StrainID: strainIDsTemp[0] }
        await setAnalysisRequest(body)
        return body
    }
    async function makeAnalysisRequest(requestBody, searchID) {
        //Make first call

        try {
            async function searchAnalysisResponse() {
                const newBody = await { ...analysisRequest, SearchID: searchID, StrainID: requestBody.StrainID }
                const response = await axios.post
                    (
                        /*Request URL*/'https://ss.prestoapi.com/api/v1_scoreanalysis',
                        /*Request Body*/newBody,
                        /*Headers*/{
                            headers:
                            {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            }
                        }
                );
                return  response.data
            }
            const response = await searchAnalysisResponse(analysisRequest)
            await setAnalysisResults(response)
            return response
        } catch (err) {
            //TODO: Log this error somewhere? Do we need a user-friendly message when this error occurs?
            //where are we gonna log errors?
            console.log(err)
        }

    }   

    //This is kinda hacky. I was playing around with timing and created the 'Final Submit Button'
    async function submitButton() {
        //await handleFormSubmit()
        await prepareAddRequestBody()
        const respList = await makeAddRequests()
        await respList.map(async (requestBody) => {
            const runResponseTemp = await makeRunRequest(requestBody)
            await runResultsList.push(runResponseTemp)
        })
        await setRunResults(runResultsList)
        const resp2 = await prepareAnalysisRequestBody(respList[0])
        const analysisResultTemp = await makeAnalysisRequest(resp2, respList[0].SearchID)
        await setAnalysisResults(analysisResultTemp)
    }

    //This is kinda hacky. I was playing around with timing and created the 'Final Submit Button'
    async function finalSubmitButton() {
        await submitButton()
        await setDisplayResult(true)
        
    }

    //Cut-off Ranges for 
    //Potency1: Flower, PreRoll | Potency2: Concentrate, DSO
    const potency1 = [0, 60]
    const potency2 = [40, 100]
  
   
    //HTML
    return (
        
        <div className={appStyle}>
            

            <div className="title-container container-fluid d-flex flex-row" onClick={toggleOptionsDisplay}>
              <img className="App-logo logo" src={logo} alt="Strain Seekr Logo"/>
              <p className="title"> <b>Strain Seekr x NoBo</b></p>
          </div>
            <div style={optionsDisplay ? { display: 'none' } :null }>
                <div className="btn-options d-flex flex-row justify-content-center flex-wrap mb-3">
                    <button onClick={() => setAppStyle('App1')}>BG 1</button>
                    <button onClick={() => setAppStyle('App2')}>BG 2</button>
                    <button onClick={() => setAppStyle('App3')}>BG 3</button>
                    <button onClick={() => setAppStyle('App4')}>BG 4</button>
                    <button onClick={() => setAppStyle('App5')}>BG 5</button>
                    <button onClick={() => setAppStyle('App6')}>BG 6</button>
                    <button onClick={() => setAppStyle('App7')}>BG 7</button>
                </div>
            </div>
            <div className="welcome container-fluid white">
                <h1 className="blue">Welcome to <br />NoBo</h1>
                <h3 className="purple"><b>Use this interactive menu for our top recommendations tailored specifically for you.</b></h3>
                <img src={headerImage} className="img-fluid" alt="Responsive image" />
            </div>
            <form >
                <ProductType sendStrainTypes={(value) => {
                    formInputData.StrainTypeIDs = value
                    setDisplayConditions(true)
                    setDisplayWeight(true)
                    scrollToConditionsChild()
                }} />
                <div className="top-space" ref={conditionsDivRef} />
                {displayConditions ? < Conditions sendConditions={(value) => {
                    formInputData.ConditionIDs = value;
                    console.log(formInputData.StrainTypeIDs);
                    formInputData.StrainTypeIDs.includes(1) || formInputData.StrainTypeIDs.includes(7) ? setDisplayTastes(true) : setDisplayTastes(false);
                    formInputData.StrainTypeIDs.includes(1) || formInputData.StrainTypeIDs.includes(7) ? setDisplayProduct1(true) : setDisplayProduct1(false);
                    formInputData.StrainTypeIDs.includes(2) || formInputData.StrainTypeIDs.includes(6) ? setDisplayProduct2(true) : setDisplayProduct2(false);
                    return scrollToTastesChild();
                }} /> : null}

                <div className="top-space" ref={tastesDivRef} />
                {displayTastes ? < Taste type="How would you like your Flower and/or Pre-Roll to taste"sendTastes={(value) => {
                    formInputData.TasteIDs = value
                    console.log(formInputData.TasteIDs)
                    scrollToPotencyChild()
                }} /> : null}
                
                <div ref={potencyDivRef} />
                {displayProduct1 ? < Potency type="Flower and/or Pre-Roll" min={0} max={60} sendTHCMin={(value) => potency1[0] = value} sendTHCMax={(value) => potency1[1] = value} /> : null}
                {displayProduct2 ? <Potency type="Concentrate and/or DSO" min={40} max={100} sendTHCMin={(value) => potency2[0] = value} sendTHCMax={(value) => potency2[1] = value} /> : null}
                {displayWeight ? < Weight sendWeight={(value) => {
                    formInputData.WeightingProperty = value
                    formInputData.WeightingTaste = 100 - value
                }} /> : null}
                <div className="top-space" />
                <button type="button" onClick={finalSubmitButton} className="btn btn-outline-success">Final Submit</button>
                
            </form>
            <div className="top-space" ref={resultsDivRef} />
            {displayResult && < Results token={token} SearchID={SearchID} runResponseList={runResults} analysisResponse={analysisResults} scrollFunction={scrollToResultsChild()} /> } <div className="top-space" />


            

           <Queue/>
      {/* <Queue getActiveCustomer={SurveyAnswers.getActiveCustomer} />
      <SurveyAnswers getActiveCustomer={SurveyAnswers.getActiveCustomer} /> */}
           

          <div className="footer-container container-fluid d-flex flex-row-reverse">
              <img className="logo" src={logo} alt="Strain Seekr Logo" />
              <p className="title"> <b>Strain Seekr x [Dispensary Name]</b></p>
              <p> icon by <a href="https://icons8.com">Icons8</a></p>
            </div>
       
            
    </div>
  );
}

export default App;