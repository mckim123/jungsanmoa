import React from "react";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledTruncateOptionButton = styled(Button)({
    fontSize: "1rem",
    backgroundColor: "#009688",
    color: "white",
    border: "none",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#689F38",
    },
});

function TruncateOption(props) {
    const [value, setValue] = React.useState("ONE");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.onSubmit) {
            props.onSubmit(value);
        }
    };

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <FormControl>
                <InputLabel shrink>단위</InputLabel>
                <Select value={value} onChange={handleChange} displayEmpty>
                    <MenuItem value="ONE">1</MenuItem>
                    <MenuItem value="TEN">10</MenuItem>
                    <MenuItem value="HUNDRED">100</MenuItem>
                    <MenuItem value="THOUSAND">1000</MenuItem>
                </Select>
            </FormControl>
            <span style={{margin: "1rem"}}> 원 단위로 </span>
            <StyledTruncateOptionButton onClick={handleSubmit}>
                정산하기
            </StyledTruncateOptionButton>
        </div>
    );
}

export default TruncateOption;