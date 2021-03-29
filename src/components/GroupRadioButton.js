import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
const GroupRadioButton = ({ radioValue, radios, handleChangeRadio }) => {
  return (
    <>
      <ButtonGroup toggle vertical className='p-0'>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type='radio'
            variant='flat'
            name='radio'
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={handleChangeRadio}
            className='text-left'
          >
            <span style={{ fontSize: "15px" }}> {radio.name}</span>
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
};

export default GroupRadioButton;
