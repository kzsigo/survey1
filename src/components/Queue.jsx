import '../scss/styles.scss'
import axios from 'axios'
import { fetchToken } from '../App.test.js';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function Queue (){
    
    const [queue, setQueue] = useState([])
    const [customer, setCustomer] = useState([])
    const [conditionValue, setConditionValue] = useState([])
    const [tasteWeightValue, setTasteWeightValue] = useState([])
    const [smellWeightValue, setSmellWeightValue] = useState([])
    const [thcMinValue, setThcMin] = useState([])
    const [thcMaxValue, setThcMax] = useState([])
    const [visible, setVisible] = useState(false);

    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchTokenAndSetState = async () => {
          try {
            const token = await fetchToken();
            setToken(token);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchTokenAndSetState();
      }, []);



   //I know this is not right and will need restructured when we split out the files
//     const a = useQuery({
//        queryKey: ['queue'],
//        queryFn: getQueue,
//        enabled: false
//    })   

//    const b = useQuery({
//        queryKey: ['customer'],
//        queryFn: getActiveCustomer,
//        enabled: false
//    })

   
//    const c = useQuery({
//        queryKey: ['results'],
//        queryFn: getSurveyResults,
//        enabled: false
//    })


    //This is for testing and development so I can quickly get the token and populate the queue
   async function refreshQueue() {
     
       getQueue()

    }
      //Customer Queue
      async function getQueue() {
        const requestBodyNew =  {
            "DispensaryID": 2,
             "TimeWindow":20000
        };
        const res = await axios.post
            (
                'https://ss.prestoapi.com/api/v1_surveyactive', requestBodyNew, {
                    headers:
                    {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                const queue = response.data
                setQueue(queue);
              }) 
    }


    async function getActiveCustomer(customerID) {
        //Get the customerID from the customer we clicked on in the queue
        //Send that and the DispensaryID to return the SearchID, StrainTypeID, StrainTypes (survey results)
        //Then go get all of the results from the survey they took with the SearchID we are returning
        const requestBody =  {
            "CustomerID":customerID,
            "DispensaryID":2,
            "TimeWindow":20000
        };
        return axios.post
            (
                'https://ss.prestoapi.com/api/v1_surveyactivecustomer', requestBody, {
                    headers:
                    {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                const [customerResults] = response.data
                //get all of the survey answers from the specific user and search
                getSurveyResults(customerResults.SearchID)
                //store the customerID to use
                setCustomer(customerID)
                //also set the visible state to true for the Survey Answers
                setVisible(true)
              }) 
    }


    async function getSurveyResults(searchID) {
        const requestBody =  {
            "SearchID":searchID
        };
        return axios.post
        (
            'https://ss.prestoapi.com/api/v1_searchparameters', requestBody, {
                headers:
                {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            const surveyResults = response.data
            setSurveyResults(surveyResults)
   
         
          }) 

    }
    async function getConditionImages(conditions) {
        const conditionsWithSrc = conditions.map(condition => {
            let srcValue;
        
            switch (condition.ID) {
                case 32:
                   srcValue = "https://icons8.com/icon/Sb5Gb0CYfoV7/back-pain";
                    break;
                case 33:
                    srcValue= "test33" ;
                    break;
                case 34:
                    srcValue="test34"; 
                    break;
                case 35:
                    srcValue= ""; 
                    break;
                case 36:
                   srcValue= "";
                    break;
                case 37:
                    srcValue= "" ;
                    break;
                case 38:
                    srcValue= "";
                    break;
                case 39:
                    srcValue= "";
                    break;
                case 40:
                   srcValue ="";
                    break;
                case 41:
                    srcValue = "" ;
                    break;
                case 42:
                    srcValue = "";
                    break;
                case 43:
                    srcValue = "" ;
                    break;
                case 44:
                    srcValue = "" ;
                    break;
                case 45:
                    srcValue = "" ;
                    break;
                default:
                    srcValue = "" ;
            }
        
            return {
              ...condition,
              Src: srcValue
            };
          });
          console.log(conditionsWithSrc);
          return conditionsWithSrc;
    }


    async function setSurveyResults(surveyResults) {
        const conditions = surveyResults.filter(({ Label }) => Label === "Condition");
        getConditionImages(conditions);
     
      //  const conditionValues = conditions.map(({ Value }) => Value);
        
        //where are we storing tastes? why is this not in this call?

        //weights
        const weightTaste = surveyResults.find(({ Label }) => Label === "WeightingTaste")
        setTasteWeightValue(weightTaste)
        const weightSmell = surveyResults.find(({ Label }) => Label === "WeightingSmell")
        setSmellWeightValue(weightSmell)

        //THC %
        const thcMin =  surveyResults.find(({ Label }) => Label === "THCMin")
        setThcMin(thcMin.Value)
        const thcMax =  surveyResults.find(({ Label }) => Label === "THCMax")
        setThcMax(thcMax.Value)

    }

return (
    <section className="content">
    <div className="customer-queue">
        <header>
        <h2>Customer Queue</h2>
        </header>
  
        <ul>
           {/* are we keeping SearchID as the unique key? */}
           {queue.map((q) => (<li onClick={() => getActiveCustomer(q.CustomerID)} key={q.SearchID}>{q.CustomerID}</li>))}
        </ul>
        <button onClick={refreshQueue} > Refresh </button>
    </div>
    {visible && (<div className="survey-answers">
            <header>
            <h2>Survey Answers</h2>
            <h3>For customer: {customer} </h3>
                </header>
            <div className="selected-results">
                <h3>Selected Effects:</h3>
                {/* for now just list the selected effects */}
                <ul> 
                   <li>{conditionValue.map((value, index) => (<span className="result-button" key={index}>{value}</span>))}</li> 
                </ul>
            
            </div>
            <div className="selected-results">
                <h3>Selected Tastes:</h3>
                {/* for now just list the selected tastes */}
                
            </div>
            <div className="selected-results">
                <h3>Weighting Values:</h3>
                {/* for now just list the category and the number */}
                <div>
                
                    <span>
                         {/* <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/bowl-with-spoon.png" alt="taste"/> */}
                         {tasteWeightValue.Label === 'WeightingTaste' && (<label>Taste</label>)}: {tasteWeightValue.Value} 
                    </span> 
                
                    <span> 
                        {/* <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/nose--v1.png" alt="smell"/>  */}
                        {smellWeightValue.Label === 'WeightingSmell' && (<label>Smell</label>)}: {smellWeightValue.Value}
                    </span>

                </div>    

            </div>
            <div className="selected-results">
                <h3>THC Range:</h3>
               <span> {thcMinValue}% - {thcMaxValue}%</span> 

            </div>

        </div>)}
        
    </section>
);
}
export default Queue;
