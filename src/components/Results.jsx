import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function Results({ SearchID, runResponseList, analysisResponse, token, scrollFunction }) {

    let resultsList = []
    async function searchRunResponse(requestBody, token) {
        const response = await axios.post
            (
                        /*Request URL*/'https://ss.prestoapi.com/api/v1_searchrun',
                        /*Request Body*/requestBody,
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

    
    /*useEffect(() => {
        async function getRunResults() {
            try {
                if (runResponseList.length > 0) {
                    //make the rest of the calls
                    console.log('runResponseList', runResponseList                    )
                    for await (const request of runResponseList) {
                        console.log('Iterarting Request', request)
                        const response = await searchRunResponse(request, token)
                        console.log('search run response', response)

                        await resultsList.push({response})

                    }
                    
                }
            } catch (err) {
                console.log(err)
            }
        }
        getRunResults();
        loading = true
    }

        , [resultsList]);*/

    /*const addJSON = [
        {
            "SearchID": 1294,
            "MaxRows": 3
        }
    ]
    const runResponseList = [
        {
            "StrainID": 67,
            "StrainTypeID": 1,
            "StrainType": "Flower",
            "Strain": "Cookies and Cream Bud 1",
            "SpeciesID": 1,
            "Species": "Sativa",
            "DominanceID": 1,
            "Dominance": "THC Dominant",
            "TotalTHC": 0.2535,
            "TotalCBD": 0.0,
            "StrainScore": 188.0,
            "InStock": 1,
            "Price": 0.00,
            "Unit": "unspecified"
        },
        {
            "StrainID": 76,
            "StrainTypeID": 1,
            "StrainType": "Flower",
            "Strain": "Jesus OG 1",
            "SpeciesID": 1,
            "Species": "Sativa",
            "DominanceID": 1,
            "Dominance": "THC Dominant",
            "TotalTHC": 0.3132,
            "TotalCBD": 0.0,
            "StrainScore": 172.0,
            "InStock": 0,
            "Price": 0.00,
            "Unit": "unspecified"
        },
        {
            "StrainID": 64,
            "StrainTypeID": 1,
            "StrainType": "Flower",
            "Strain": "Platinum Banana OG",
            "SpeciesID": 1,
            "Species": "Sativa",
            "DominanceID": 1,
            "Dominance": "THC Dominant",
            "TotalTHC": 0.2423,
            "TotalCBD": 0.0,
            "StrainScore": 142.0,
            "InStock": 1,
            "Price": 0.00,
            "Unit": "unspecified"
        }
    ]
    const analysisResponse = [
        {
            "Category": "Property",
            "TC": "Terpene",
            "TerpeneCannabinoid": "Endo-(+)-Fenchyl Alcohol",
            "Property": "Anti-Microbial",
            "Score": 0.041999999999999996,
            "Percentage": 0.0006
        },
        {
            "Category": "Property",
            "TC": "Terpene",
            "TerpeneCannabinoid": "Alpha Bisabolol",
            "Property": "Anti-Microbial",
            "Score": 0.028,
            "Percentage": 0.0004
        },
        {
            "Category": "Property",
            "TC": "Terpene",
            "TerpeneCannabinoid": "Alpha Pinene",
            "Property": "Anti-Microbial",
            "Score": 0.028,
            "Percentage": 0.0004
        },
        {
            "Category": "Property",
            "TC": "Terpene",
            "TerpeneCannabinoid": "Beta-Myrcene",
            "Property": "Anti-Microbial",
            "Score": 0.063,
            "Percentage": 0.0009
        },
        {
            "Category": "Property",
            "TC": "Terpene",
            "TerpeneCannabinoid": "cis-nerolidol",
            "Property": "Anti-Microbial",
            "Score": 0.028,
            "Percentage": 0.0004
        }
    ]
    */
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    //const [addJSON, setSampleAddJSON] = useState({})
    //const [runResponseList, setResultsJSON] = useState({})
    //const [analysisResponse, setAnalysisJSON] = useState({})
    let loading = false
    //const [loading, setLoading] = useState(false);
    /*useEffect(() => {
        console.log(searchRunRequestBody)
        console.log(searchRunRequestBody.SearchID)
        console.log(searchRunRequestBody[0])
        async function getStrainTypes() {
            try {
                const res = await axios.post
                    (
                        'https://ss.prestoapi.com/api/v1_searchrun',
                        searchRunRequestBody,
                        {
                            headers:
                            {
                                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmZTgzNGE4Yy04ZDM4LTRhODgtYmZkYi0yMTgyZDA1OTYxZWYiLCJwcm9qZWN0SUQiOiIzNTEwIiwibmFtZSI6IkphdmFzY3JpcHRUZXN0ZXIiLCJlbWFpbCI6ImphdmFzY3JpcHRAZ29vZ2xlLmNvbSIsInByb3ZpZGVyIjoiRW1haWwvUGFzc3dvcmQiLCJjcmVhdGVkIjoiMS80LzIwMjMgODo1NToxOCBQTSIsImxhc3RMb2dpbiI6IjMvMjYvMjAyMyA5OjAzOjMzIFBNIiwicm9sZSI6IkNyZWF0ZSIsIm1ldGFkYXRhIjoie1wiXCI6XCJcIn0iLCJleHAiOjE2Nzk4ODEzNjUsImlzcyI6IlByZXN0b0FQSSIsImF1ZCI6InNzIn0.z9mJT5JGDnwRcN2GX8WAVS1jLqYwMxBHIXtWdsbZFCI',
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                setAnalysisJSON(res.data);
                setLoading(true);
                console.log(strainTypes);
            } catch (err) {
                console.log(err)
            }
        } 
        getStrainTypes();
    }

        , []);
        */

    return (
        <div className="container main-container opacity">
            <h1 className="headerTxt purple">Results</h1>
            <div>
                {/*console.log('Run ResponseList from Results Component', resultsList)*/}
                {console.log('Run ResponseList from Results Component', runResponseList)}
                <h2>Submission Number</h2>
                <h1>{SearchID}</h1>
            </div>
            <div>
                <h2>Suggestion Details</h2>
                <p>Based on your responses, you will benefit most from the folowing terpenes:
                    {analysisResponse.map((results) => (<span>{results.TerpeneCannabinoid} </span>))}</p>
            </div>
            {runResponseList.map((response) => (                       
                            <div>
                                <h2 key={response[0].StrainID}>top {response[0].StrainType} Results</h2>
                                <Carousel responsive={responsive}>
                                    {response.map((results) => (
                                        <div className="container main-container" key={results.StrainID}>
                                            <div><b>Type</b>: {results.StrainType}</div>
                                            <div><b>Product</b>: {results.Strain}</div>
                                            <div><b>Species</b>: {results.Species}</div>
                                            <div><b>Total THC</b>: {results.TotalTHC}</div>
                                            <div><b>Total CBD</b>: {results.TotalCBD}</div>
                                            <div><a href={'https://dutchie.com/dispensary/pleasantrees-detroit/products?search=' + results.Strain} target="_blank">Search Product</a></div>
                                        </div>
                                    ))}

                                </Carousel>
                            </div>)

                ) 
            }
            <div>
                <h2>Benefits</h2>
                <Carousel responsive={responsive}>
                    {analysisResponse.map((analysis) => (
                        <div className="container main-container" key={analysis.TerpeneCannabinoid}>
                            <div><b>Terpene</b>: {analysis.TerpeneCannabinoid}</div>
                            <div><b>Property</b>: {analysis.Property}</div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div>
                <h2>Next Steps</h2>

            </div>
        </div>
    );
}

