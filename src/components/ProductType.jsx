import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FlowerPhoto from '../images/strainType/Flower.jpg'
import CartPhoto from '../images/strainType/Cart.jpg'
import ConcentratePhoto from '../images/strainType/Concentrate.jpg'
import EdiblePhoto from '../images/strainType/Edible.jpg'
import MoonrockPhoto from '../images/strainType/Moonrock.jpg'
import PreRollPhoto from '../images/strainType/PreRoll.jpg'
import defaultPhoto from '../images/strainType/strainSeekrLogo2.PNG'
import './ProductType.css';

function ProductType({ sendStrainTypes }) {
    //let productTypes = []
    let [productTypes, setProductTypes] = useState([]);
    const [strainTypes, setStrainTypes] = useState([
        {
            "StrainTypeID": 1,
            "StrainType": "Flower",
            "THCMin": 10,
            "THCMax": 40
        },
        {
            "StrainTypeID": 2,
            "StrainType": "Concentrate",
            "THCMin": 35,
            "THCMax": 100
        },
        {
            "StrainTypeID": 3,
            "StrainType": "Edible",
            "THCMin": 0,
            "THCMax": 100
        },
        {
            "StrainTypeID": 4,
            "StrainType": "Topical",
            "THCMin": 0,
            "THCMax": 100
        },
        {
            "StrainTypeID": 5,
            "StrainType": "Tincture",
            "THCMin": 0,
            "THCMax": 100
        },
        {
            "StrainTypeID": 6,
            "StrainType": "RSO",
            "THCMin": 0,
            "THCMax": 100
        },
        {
            "StrainTypeID": 7,
            "StrainType": "Pre-Roll",
            "THCMin": 5,
            "THCMax": 60
        },
        {
            "StrainTypeID": 8,
            "StrainType": "Cart",
            "THCMin": 40,
            "THCMax": 100
        },
        {
            "StrainTypeID": 9,
            "StrainType": "Distillate",
            "THCMin": 0,
            "THCMax": 100
        },
        {
            "StrainTypeID": 10,
            "StrainType": "MoonRock",
            "THCMin": 20,
            "THCMax": 75
        }
    ]
    );

    //Toggle Functions
    const toggleFlower = () => {
        toggleFlowerSelected(!isFlowerSelected);
        isFlowerSelected ? productTypes = productTypes.push(1) : productTypes = productTypes.splice(productTypes.indexOf(1), 1)
    }
    const toggleConcentrate = () => {
        toggleConcentrateSelected(!isConcentrateSelected);
        isConcentrateSelected ? productTypes = productTypes.push(2) : productTypes = productTypes.splice(productTypes.indexOf(2), 1)
        
    }
    const toggleEdible = () => {
        toggleEdibleSelected(!isEdibleSelected);
        isEdibleSelected ? productTypes = productTypes.push(3) : productTypes = productTypes.splice(productTypes.indexOf(3), 1)
    }
    const toggleTopical = () => {
        toggleTopicalSelected(!isTopicalSelected);
        isEdibleSelected ? productTypes = productTypes.push(4) : productTypes = productTypes.splice(productTypes.indexOf(4), 1)  
    }
    const toggleTincture = () => {
        toggleTinctureSelected(!isTinctureSelected);
        isTinctureSelected ? productTypes = productTypes.push(5) : productTypes = productTypes.splice(productTypes.indexOf(5), 1)
        
    }
    const toggleRSO = () => {
        toggleRSOSelected(!isRSOSelected);
        isRSOSelected ? productTypes = productTypes.push(6) : productTypes = productTypes.splice(productTypes.indexOf(6), 1)
        
    }
    const togglePreRoll = () => {
        togglePreRollSelected(!isPreRollSelected);
        isPreRollSelected ? productTypes = productTypes.push(7) : productTypes = productTypes.splice(productTypes.indexOf(7), 1)
        
    }
    const toggleCart = () => {
        toggleCartSelected(!isCartSelected);
        isCartSelected ? productTypes = productTypes.push(8) : productTypes = productTypes.splice(productTypes.indexOf(8), 1)
        
    }
    const toggleDistillate = () => {
        toggleDistillateSelected(!isDistillateSelected);
        isDistillateSelected ? productTypes = productTypes.push(9) : productTypes = productTypes.splice(productTypes.indexOf(9), 1)
        
    }
    const toggleMoonRock = () => {
        toggleMoonRockSelected(!isMoonRockSelected);
        isMoonRockSelected ? productTypes = productTypes.push(10) : productTypes = productTypes.splice(productTypes.indexOf(10), 1)
        
    }

    //Hooks for checking and setting selection toggle
    const [isFlowerSelected, toggleFlowerSelected] = useState(true);
    const [isConcentrateSelected, toggleConcentrateSelected] = useState(true);
    const [isEdibleSelected, toggleEdibleSelected] = useState(true);
    const [isTopicalSelected, toggleTopicalSelected] = useState(true);
    const [isTinctureSelected, toggleTinctureSelected] = useState(true);
    const [isRSOSelected, toggleRSOSelected] = useState(true);
    const [isPreRollSelected, togglePreRollSelected] = useState(true);
    const [isCartSelected, toggleCartSelected] = useState(true);
    const [isDistillateSelected, toggleDistillateSelected] = useState(true);
    const [isMoonRockSelected, toggleMoonRockSelected] = useState(true);

    const [loading, setLoading] = useState(true);
    /*useEffect(() => {
        async function getStrainTypes() {
            try {
                const res = await axios.post
                    (
                        'https://ss.prestoapi.com/api/v1_straintype',
                        {
                            DispensaryID: 0
                        },
                        {
                            headers:
                            {
                                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiNjMwMWVmMS1iOGJlLTQyM2ItYTEwZi0xNTJjMDhhNWNjMmQiLCJwcm9qZWN0SUQiOiIzNTEwIiwibmFtZSI6IlJldmVsb3AiLCJlbWFpbCI6InJldmVsb3BAcmV2ZWxvcC5jb20iLCJwcm92aWRlciI6IkVtYWlsL1Bhc3N3b3JkIiwiY3JlYXRlZCI6IjExLzUvMjAyMiAxMTo0MzoxNCBQTSIsImxhc3RMb2dpbiI6IjMvMTEvMjAyMyA1OjM1OjExIFBNIiwicm9sZSI6IkNyZWF0ZSIsIm1ldGFkYXRhIjoiIiwiZXhwIjoxNjc4NTcwODU2LCJpc3MiOiJQcmVzdG9BUEkiLCJhdWQiOiJzcyJ9.-ArGQi0iwnUBQMSx867owsIHEKsZRgJL82h9BBWtyQY',
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                setStrainTypes(res.data);
                setLoading(true);
                console.log(strainTypes);
            } catch (err) {
                console.log(err)
            }
        } 
        getStrainTypes();
    }

        , []);*/

    //Handlers
    function photoHandler(StrainTypeID) {
        switch (StrainTypeID) {
            case 1:
                return FlowerPhoto
                break;
            case 2:
                return ConcentratePhoto
                break;
            case 3:
                return EdiblePhoto
                break;
            /*case 4:
                return "Tropical"
                break;
            case 5:
                return "Tincture"
                break;
            case 6:
                return "RSO"
                break;*/
            case 7:
                return PreRollPhoto
                break;
            case 8:
                return CartPhoto
                break;
            /*case 9:
                return "Distillate"
                break;*/
            case 10:
                return MoonrockPhoto
                break;
            default:
                return defaultPhoto
            // code block
        }
    }
    function strainSelectionHandler(StrainTypeID) {
        switch (StrainTypeID) {
            case 1:
                return toggleFlower
                break;
            case 2:
                return toggleConcentrate
                break;
            case 3:
                return toggleEdible
                break;
            case 4:
                return toggleTopical
                break;
            case 5:
                return toggleTincture
                break;
            case 6:
                return toggleRSO
                break;
            case 7:
                return togglePreRoll
                break;
            case 8:
                return toggleCart
                break;
            case 9:
                return toggleDistillate
                break;
            case 10:
                return toggleMoonRock
                break;
            default:
                return "Default"
            // code block
        }
        console.log(productTypes)

    }
    function setStrainSelectionHandler(StrainTypeID) {
        switch (StrainTypeID) {
            case 1:
                return isFlowerSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 2:
                return isConcentrateSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 3:
                return isEdibleSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 4:
                return isTopicalSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 5:
                return isTinctureSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 6:
                return isRSOSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 7:
                return isPreRollSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 8:
                return isCartSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 9:
                return isDistillateSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 10:
                return isMoonRockSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            default:
                return "Default"
            // code block
        }

    }   
    //This function might not be necessary
    const handleStrainSelection = () => {
        sendStrainTypes(productTypes)
    }

    const nextButton = () => {
        handleStrainSelection()
    }

    return (
        
        <div className="container main-container opacity">
            <h2 className="headerTxt blue">What Product Type Are You Looking For Today?</h2>
            <h6 className="sub-header-txt">(choose up to 3)</h6>

            <div className="options d-flex flex-row justify-content-center flex-wrap mb-3 no-opacity-product">
                {loading && strainTypes.map((strainType) => (
                    <div className="" key={strainType.StrainTypeID} >
                        <button type="button" onClick={strainSelectionHandler(strainType.StrainTypeID)}
                            className={`card-text btn card-button ${setStrainSelectionHandler(strainType.StrainTypeID)}`}
                        >
                            {strainType.StrainType}
                        </button>                       
                        {
                            //<img src={photoHandler(tastes.TasteID)} className={setTasteSelectionHandler(tastes.TasteID)} alt="..." style={{ borderRadius: 10 }} />
                        }
                    </div>
                ))}
            </div>
            <button type="button" onClick={nextButton} className="btn btn-success">Next</button>
 
        </div>
  );
}

export default ProductType;
