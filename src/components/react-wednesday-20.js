import { useState } from "react";
import styled from "styled-components";




function Box({ buttonText, color, defaultColor = "#333" }) {

  const [activeColor, setActiveColor] = useState(defaultColor);

  function handleClick() {
    setActiveColor(color);
    }

  return (
        <div className="container">
        <div
            className="box"
            style={{
            width: "100px",
            height: "100px",
            backgroundColor: activeColor,
            marginBottom: "5px"
            }}
        />
        <button onClick={handleClick}>{buttonText}</button>
        </div>
  );
}


const BoxContainer = styled.div`
    margin-top: 100px;
    font-family: sans-serif;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
`;

function AppBox() {
  return (
    <div className="App">
      <BoxContainer>
        <Box buttonText="Red" color="#900000" />
        <Box buttonText="Green" color="green" />
        <Box buttonText="Blue" color="#000041" />
      </BoxContainer>
      <BoxContainer>
        <Box buttonText="Red" color="#900000" />
        <Box buttonText="Green" color="green" />
        <Box buttonText="Blue" color="#000041" />
      </BoxContainer>
      <BoxContainer>
        <Box buttonText="Red" color="#900000" />
        <Box buttonText="Green" color="green" />
        <Box buttonText="Blue" color="#000041" />
      </BoxContainer>
    </div>
  );
}

export default AppBox;