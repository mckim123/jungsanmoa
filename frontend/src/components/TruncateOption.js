import React from "react";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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
        <div style={{display: "flex", alignItems: "center", marginBottom: "3rem"}}>
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                정산하기
            </Button>
        </div>
    );
}

export default TruncateOption;
