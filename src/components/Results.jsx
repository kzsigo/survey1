import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function Results({ SearchID, runResponseList, analysisResponse, token, scrollFunction }) {

    
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


    return (
        <div className="container main-container opacity">
            <h1 className="headerTxt purple"></h1>
            {console.log('analysisResponse from Results Component', analysisResponse)}
            {console.log('Run ResponseList from Results Component', runResponseList)}
            <div>
                <h2>Based on your responses</h2> <p>you will benefit most from the folowing terpenes:</p>
                    <ul>{analysisResponse.map((results) => (<li>{results.TerpeneCannabinoid} for {results.Property}</li>))}</ul>
            </div>
            {runResponseList.map((response) => (                       
                            <div>
                                <h2 key={response[0].StrainID}>top {response[0].StrainType} Results</h2>
                                <Carousel responsive={responsive}>
                                    {response.map((results) => (
                                        <div className="container main-container" key={results.StrainID}>
\                                            <div><b>Product</b>: {results.Strain}</div>
                                            <div><b>Species</b>: {results.Species}</div>
                                            <div>{results.TotalTHC} <b>THC</b></div>
                                            <div>{results.TotalCBD} <b>CBD</b></div>
                                            <div><a href={'https://dutchie.com/dispensary/pleasantrees-detroit/products?search=' + results.Strain} target="_blank">Search Product</a></div>
                                        </div>
                                    ))}

                                </Carousel>
                            </div>)

                ) 
            }
        </div>
    );
}

