import { CardMedia, ToggleButtonGroup } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import React, { useState } from 'react';
import anxietyPhoto from '../images/conditions/anxiety.PNG'
import calmPhoto from '../images/conditions/calm.jfif'
import depressionPhoto from '../images/conditions/depression.jpg'
import focusPhoto from '../images/conditions/focus.jpg'
import gentleHighPhoto from '../images/conditions/gentleHigh.jfif'
import happyPhoto from '../images/conditions/happy.PNG'
import insomniaPhoto from '../images/conditions/insomnia.jfif'
import muscleSpasmsPhoto from '../images/conditions/muscleSpasm.jpg'
import nauseaPhoto from '../images/conditions/nausea.jpg'
import painPhoto from '../images/conditions/pain.jfif'
import sleepPhoto from '../images/conditions/sleep.jpg'
import strongHighPhoto from '../images/conditions/strongHigh.jpg'
import './Conditions.css';


function Conditions({ sendConditions }) {

    const [conditions, setConditions] = useState(
        [
            {
                "ConditionID": 32,
                "Condition": "Pain",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 33,
                "Condition": "PTSD",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 34,
                "Condition": "Sleep",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 35,
                "Condition": "Muscle Spasms",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 36,
                "Condition": "Daytime Focus",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 37,
                "Condition": "Happy",
                "ConditionType": "Recreational"
            },
            {
                "ConditionID": 38,
                "Condition": "Calm",
                "ConditionType": "Recreational"
            },
            {
                "ConditionID": 39,
                "Condition": "Gentle High",
                "ConditionType": "Recreational"
            },
            {
                "ConditionID": 40,
                "Condition": "Focused",
                "ConditionType": "Recreational"
            },
            {
                "ConditionID": 41,
                "Condition": "Sleepy",
                "ConditionType": "Recreational"
            },
            {
                "ConditionID": 42,
                "Condition": "Strong High",
                "ConditionType": "Recreational"
            },
            {
                "ConditionID": 43,
                "Condition": "Nausea",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 44,
                "Condition": "Anxiety",
                "ConditionType": "Medical"
            },
            {
                "ConditionID": 45,
                "Condition": "ADHD",
                "ConditionType": "Medical"
            }
        ]
    );

    let [conditionsSelected, setConditionsSelected] = useState([])

    const [isAnxietySelected, toggleAnxietySelected] = useState(true);
    const [isCalmSelected, toggleCalmSelected] = useState(true);
    const [isFocusSelected, toggleFocusSelected] = useState(true);
    const [isDayFocusSelected, toggleDayFocusSelected] = useState(true);
    const [isGentleHighSelected, toggleGentleHighSelected] = useState(true);
    const [isHappySelected, toggleHappySelected] = useState(true);
    const [isSleepySelected, toggleSleepySelected] = useState(true);
    const [isMuscleSpasmsSelected, toggleMuscleSpasmsSelected] = useState(true);
    const [isNauseaSelected, toggleNauseaSelected] = useState(true);
    const [isPainSelected, togglePainSelected] = useState(true);
    const [isPTSDSelected, togglePTSDSelected] = useState(true);
    const [isSleepSelected, toggleSleepSelected] = useState(true);
    const [isStrongHighSelected, toggleStrongHighSelected] = useState(true);
    const [isADHDSelected, toggleADHDSelected] = useState(true);

    const togglePain = () => {
        togglePainSelected(!isPainSelected);
        isPainSelected ? conditionsSelected = conditionsSelected.push(32) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(32), 1)
    }
    const togglePTSD = () => {
        togglePTSDSelected(!isPTSDSelected);
        isPTSDSelected ? conditionsSelected = conditionsSelected.push(33) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(33), 1)
    }
    const toggleSleep = () => {
        toggleSleepSelected(!isSleepSelected);
        isSleepSelected ? conditionsSelected = conditionsSelected.push(34) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(34), 1)
    }
    const toggleMuscleSpasms = () => {
        toggleMuscleSpasmsSelected(!isMuscleSpasmsSelected);
        isMuscleSpasmsSelected ? conditionsSelected = conditionsSelected.push(35) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(35), 1)
    }
    const toggleDayFocus = () => {
        toggleDayFocusSelected(!isDayFocusSelected);
        isDayFocusSelected ? conditionsSelected = conditionsSelected.push(36) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(36), 1)
    }
    const toggleHappy = () => {
        toggleHappySelected(!isHappySelected);
        isHappySelected ? conditionsSelected = conditionsSelected.push(37) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(37), 1)
    }
    const toggleCalm = () => {
        toggleCalmSelected(!isCalmSelected);
        isCalmSelected ? conditionsSelected = conditionsSelected.push(38) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(38), 1)
    }
    const toggleGentleHigh = () => {
        toggleGentleHighSelected(!isGentleHighSelected);
        isGentleHighSelected ? conditionsSelected = conditionsSelected.push(39) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(39), 1)
    }
    const toggleFocus = () => {
        toggleFocusSelected(!isFocusSelected);
        isFocusSelected ? conditionsSelected = conditionsSelected.push(40) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(40), 1)
    }
    const toggleSleepy = () => {
        toggleSleepySelected(!isSleepySelected);
        isSleepySelected ? conditionsSelected = conditionsSelected.push(41) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(41), 1)
    }
    const toggleStrongHigh = () => {
        toggleStrongHighSelected(!isStrongHighSelected);
        isStrongHighSelected ? conditionsSelected = conditionsSelected.push(42) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(42), 1)
    }
    const toggleNausea = () => {
        toggleNauseaSelected(!isNauseaSelected);
        isNauseaSelected ? conditionsSelected = conditionsSelected.push(43) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(43), 1)
    }
    const toggleAnxiety = () => {
        toggleAnxietySelected(!isAnxietySelected);
        isAnxietySelected ? conditionsSelected = conditionsSelected.push(44) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(44), 1)
    }
    const toggleADHD = () => {
        toggleADHDSelected(!isADHDSelected);
        isADHDSelected ? conditionsSelected = conditionsSelected.push(45) : conditionsSelected = conditionsSelected.splice(conditionsSelected.indexOf(45), 1)
    }

    const [loading, setLoading] = useState(true);

    function photoHandler(conditionID) {
        switch (conditionID) {
            case 32:
                return painPhoto
                break;
            case 33:
                return anxietyPhoto
                break;
            case 34:
                return insomniaPhoto
                break;
            case 35:
                return muscleSpasmsPhoto
                break;
            case 36:
                return focusPhoto
                break;
            case 37:
                return happyPhoto
                break;
            case 38:
                return calmPhoto
                break;
            case 39:
                return gentleHighPhoto
                break;
            case 40:
                return focusPhoto
                break;
            case 41:
                return sleepPhoto
                break;
            case 42:
                return strongHighPhoto
                break;
            case 43:
                return nauseaPhoto
                break;
            case 44:
                return anxietyPhoto
                break;
            case 45:
                return focusPhoto
                break;
            default:
                return "Default"
            // code block
        }

    }
    function conditionSelectionHandler(conditionID) {
        switch (conditionID) {
            case 32:
                return togglePain
                break;
            case 33:
                return togglePTSD
                break;
            case 34:
                return toggleSleep
                break;
            case 35:
                return toggleMuscleSpasms
                break;
            case 36:
                return toggleDayFocus
                break;
            case 37:
                return toggleHappy
                break;
            case 38:
                return toggleCalm
                break;
            case 39:
                return toggleGentleHigh
                break;
            case 40:
                return toggleFocus
                break;
            case 41:
                return toggleSleepy
                break;
            case 42:
                return toggleStrongHigh
                break;
            case 43:
                return toggleNausea
                break;
            case 44:
                return toggleAnxiety
                break;
            case 45:
                return toggleADHD
                break;
            default:
                return "Default"
            // code block
        }
    }
    function setConditionSelectionHandler(conditionID) {
        switch (conditionID) {
            case 1:
                return isFlowerSelected ? '' : ' selected-border'
                break;
            case 32:
                return isPainSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 33:
                return isPTSDSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 34:
                return isSleepSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 35:
                return isMuscleSpasmsSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 36:
                return isDayFocusSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 37:
                return isHappySelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 38:
                return isCalmSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 39:
                return isGentleHighSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 40:
                return isFocusSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 41:
                return isSleepySelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 42:
                return isStrongHighSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 43:
                return isNauseaSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 44:
                return isAnxietySelected ? 'btn-light' : 'btn-info selected-border'
                break;
            case 45:
                return isADHDSelected ? 'btn-light' : 'btn-info selected-border'
                break;
            default:
                return "Default"
            // code block
        }
    }

    const handleConditionsSelection = () => {
        sendConditions(conditionsSelected)
    }

    return (
        <div className="container main-container">
            <h2 className="headerTxt peach">What Benefits Are You Looking For Today?</h2>
            <h6 className="sub-header-txt">(choose up to 3)</h6 >
            <div className="options d-flex flex-row justify-content-center flex-wrap mb-3">
                
                {loading && conditions.map((conditions) => (
                    <div className="" key={conditions.ConditionID} >
                        <button type="button" onClick={conditionSelectionHandler(conditions.ConditionID)}
                            className={`card-text btn card-button ${setConditionSelectionHandler(conditions.ConditionID)}`}
                            >
                            {conditions.Condition}
                        </button>                       
                        {
                            //<img src={photoHandler(conditions.ConditionID)} className={setConditionSelectionHandler(conditions.ConditionID)} alt="..." style={{ borderRadius: 10 }} />
                        }
                    </div>
                ))}
                <br/>
                <br/>
                <p className="sub-header-txt peach">***Please do not use Cannabis if you are pregnant, expecting or breast-feeding***</p>
                <button type="button" onClick={handleConditionsSelection} className="btn btn-outline-success">Next</button>
            </div>
        </div>
  );
}
/*<div className="custom-card" onClick={toggleCalm}>
                    <img src={calmPhoto} className={isCalmSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Feel Calm</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleDepression}>
                    <img src={depressionPhoto} className={isDepressionSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Relieve Depression</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleFocus}>
                    <img src={focusPhoto} className={isFocusSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Focus</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleGentleHigh}>
                    <img src={gentleHighPhoto} className={isGentleHighSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Gentle High</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleHappy}>
                    <img src={happyPhoto} className={isHappySelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Feel Happy</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleInsomnia}>
                    <img src={insomniaPhoto} className={isInsomniaSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Relieve Insomnia</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleMuscleSpasm}>
                    <img src={muscleSpasmsPhoto} className={isMuscleSpasmSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Relieve Muscle Spasm</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleNausea}>
                    <img src={nauseaPhoto} className={isNauseaSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Relieve Nausea</p>
                    </div>
                </div>

                <div className="custom-card" onClick={togglePain}>
                    <img src={painPhoto} className={isPainSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Relieve Pain</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleSleep}>
                    <img src={sleepPhoto} className={isSleepSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Sleep</p>
                    </div>
                </div>

                <div className="custom-card" onClick={toggleStrongHigh}>
                    <img src={strongHighPhoto} className={isStrongHighSelected ? 'card-img-top' : 'card-img-top selected-border'} alt="..." style={{ borderRadius: 10 }} />
                    <div className="card-body">
                        <p className="card-text">Strong High</p>
                    </div>
                </div>*/

export default Conditions;
