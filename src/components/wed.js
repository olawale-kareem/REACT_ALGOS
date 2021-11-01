import React, {useState} from 'react';
import styled from 'styled-components';




function Box({color, btn_text, def_color='black'}) {
    const [colors, setColors] = useState(def_color)

    const handleColor = () => {
        setColors( color);
    }

    return(
        <div className="container">
            <div 
                style = {{ 
                    width: '100px',
                    height: '100px',
                    backgroundColor: colors,
                    marginBottom: '10px'
                }}
            >
            </div>
            <button onClick={handleColor} > {btn_text} </button>
        </div>


    )
}

const BoxWrapper = styled.div`
    display: flex;
    text-align: center;
    margin-top: 100px;
    font-family: sans-serif;
    justify-content: space-evenly;
`

export default function  ShowBox() {
    return(

        <BoxWrapper>
            <Box btn_text='GREEN' color='green'/>
            <Box btn_text='BLUE' color='blue'/>
            <Box btn_text='RED' color='red'/>
        </BoxWrapper> 

    ) 
}