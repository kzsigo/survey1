import { CardMedia, ToggleButtonGroup } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import React, { useState } from 'react';
import fruityPhoto from '../images/conditions/anxiety.PNG'
import earthyPhoto from '../images/conditions/calm.jfif'
import bourbonPhoto from '../images/conditions/depression.jpg'
import herbalPhoto from '../images/conditions/focus.jpg'
import sweetPhoto from '../images/conditions/gentleHigh.jfif'
import spicyPhoto from '../images/conditions/happy.PNG'
import './Conditions.css';


function Taste({ sendTastes, type }) {

    const [tastes, setTastes] = useState(
        [
            {
                "TasteID": 36,
                "Taste": "Fruity"
            },
            {
                "TasteID": 37,
                "Taste": "Earthy"
            },
            {
                "TasteID": 38,
                "Taste": "Bourbon"
            },
            {
                "TasteID": 39,
                "Taste": "Herbal"
            },
            {
                "TasteID": 40,
                "Taste": "Sweet"
            },
            {
                "TasteID": 41,
                "Taste": "Spicy"
            }
        ]
    );

    let [tastesSelected, setTastesSelected] = useState([])

    const [isFruitySelected, toggleFruitySelected] = useState(true);
    const [isEarthySelected, toggleEarthySelected] = useState(true);
    const [isBourbonSelected, toggleBourbonSelected] = useState(true);
    const [isHerbalSelected, toggleHerbalSelected] = useState(true);
    const [isSweetSelected, toggleSweetSelected] = useState(true);
    const [isSpicySelected, toggleSpicySelected] = useState(true);
    

    const toggleFruity = () => {
        toggleFruitySelected(!isFruitySelected);
        isFruitySelected ? tastesSelected = tastesSelected.push(36) : tastesSelected = tastesSelected.splice(tastesSelected.indexOf(36), 1)
    }
    const toggleEarthy = () => {
        toggleEarthySelected(!isEarthySelected);
        isEarthySelected ? tastesSelected = tastesSelected.push(37) : tastesSelected = tastesSelected.splice(tastesSelected.indexOf(37), 1)
    }
    const toggleBourbon = () => {
        toggleBourbonSelected(!isBourbonSelected);
        isBourbonSelected ? tastesSelected = tastesSelected.push(38) : tastesSelected = tastesSelected.splice(tastesSelected.indexOf(38), 1)
    }
    const toggleHerbal = () => {
        toggleHerbalSelected(!isHerbalSelected);
        isHerbalSelected ? tastesSelected = tastesSelected.push(39) : tastesSelected = tastesSelected.splice(tastesSelected.indexOf(39), 1)
    }
    const toggleSweet = () => {
        toggleSweetSelected(!isSweetSelected);
        isFruitySelected ? tastesSelected = tastesSelected.push(40) : tastesSelected = tastesSelected.splice(tastesSelected.indexOf(40), 1)
    }
    const toggleSpicy = () => {
        toggleSpicySelected(!isSpicySelected);
        isSpicySelected ? tastesSelected = tastesSelected.push(41) : tastesSelected = tastesSelected.splice(tastesSelected.indexOf(41), 1)
    }
       

    const [loading, setLoading] = useState(true);

    function photoHandler(conditionID) {
        switch (conditionID) {
            case 36:
                return fruityPhoto
                break;
            case 37:
                return earthyPhoto
                break;
            case 38:
                return bourbonPhoto
                break;
            case 39:
                return herbalPhoto
                break;
            case 40:
                return sweetPhoto
                break;
            case 41:
                return spicyPhoto
                break;
            
            default:
                return "Default"
            // code block
        }

    }
    function tasteSelectionHandler(tasteID) {
        switch (tasteID) {
            case 36:
                return toggleFruity
                break;
            case 37:
                return toggleEarthy
                break;
            case 38:
                return toggleBourbon
                break;
            case 39:
                return toggleHerbal
                break;
            case 40:
                return toggleSweet
                break;
            case 41:
                return toggleSpicy
                break;
            default:
                return "Default"
            // code block
        }
    }
    function setTasteSelectionHandler(tasteID) {
        switch (tasteID) {
            case 36:
                return isFruitySelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 37:
                return isEarthySelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 38:
                return isBourbonSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 39:
                return isHerbalSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 40:
                return isSweetSelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            case 41:
                return isSpicySelected ? 'btn-outline-info' : 'btn-info selected-border'
                break;
            default:
                return "Default"
            // code block
        }
    }

    const handleTastesSelection = () => {
        sendTastes(tastesSelected)
    }

    return (
        <div className="container main-container">
            <h2 className="headerTxt purple">{type }</h2>
            <h6 className="sub-header-txt purple">(choose up to 3)</h6 >
            <div className="options d-flex flex-row justify-content-center flex-wrap mb-3">
                
                {loading && tastes.map((tastes) => (
                    <div className="" key={tastes.TasteID} >
                        <button type="button" onClick={tasteSelectionHandler(tastes.TasteID)}
                            className={`card-text btn card-button ${setTasteSelectionHandler(tastes.TasteID)}`}
                        >
                            {tastes.Taste}
                        </button>                       
                        {
                            //<img src={photoHandler(tastes.TasteID)} className={setTasteSelectionHandler(tastes.TasteID)} alt="..." style={{ borderRadius: 10 }} />
                        }
                    </div>
                ))}
                <br/>
                <br/>
                <p className="sub-header-txt purple">***Please do not use Cannabis if you are pregnant, expecting or breast-feeding***</p>
                <button type="button" onClick={handleTastesSelection} className="btn btn-outline-success">Next</button>
            </div>
        </div>
  );
}

export default Taste;
