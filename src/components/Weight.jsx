import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

export default function Weight({ sendWeight }) {
    const [weight, setWeight] = useState(50);

    const handleChange = async (event, newValue) => {
        await setWeight(newValue);
        sendWeight(weight);
    };

    return (
        <div className="container main-container opacity">
            <h2 className="headerTxt purple">What do you value most?</h2>
            <h6 className="sub-header-txt">Place the slider for your weight range</h6>
            <div className="justify-content-center container">
                <Box sx={{ width: 200 }}>
                    <Slider
                        name= "weight"
                        track={false}
                        getAriaLabel={() => 'Temperature range'}
                        defaultValue={50}
                        value={weight}
                        min={0}
                        max={100}
                        onChange={handleChange}
                        getAriaValueText={valuetext}
                    />
                </Box>
                <div className="d-flex bd-highlight">
                    <div className="p-2  bd-highlight"><h2>Taste</h2></div>
                    <div className="ms-auto p-2 bd-highlight"><h2>Benefits</h2></div>
                </div>
            </div>
        </div>

    );
}
