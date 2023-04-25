import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}`;
}

export default function Potency({min, max, sendTHCMin, sendTHCMax, type}) {
    const [potencyRange, setPotencyRange] = useState([0, 100]);

    const handleChange = (event, newValue) => {
        setPotencyRange(newValue);
        sendTHCMin(potencyRange[0])
        sendTHCMax(potencyRange[1])
    };
    
    return (
        <div className="container main-container opacity">
            <h2 className="headerTxt purple">Choose THC% range for your {type}</h2>
            <h6 className="sub-header-txt">Place the slider for your THC Potency range</h6>
            <div className="justify-content-center container">
                <Box sx={{ width: 200 }}>
                    <Slider
                        potency = "potency"
                        getAriaLabel={() => 'Temperature range'}
                        value={potencyRange}
                        min={min}
                        max={max}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
            </div>
        </div>
    );
}
