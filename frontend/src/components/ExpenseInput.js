import React, {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {DeleteOutline} from "@mui/icons-material";

const ParticipantCheckboxContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    margin: "0 0.2rem",
});

const ParticipantCheckbox = styled(Checkbox)({});

const ParticipantLabel = styled(Typography)({
    fontSize: "1rem",
});

const ExpenseInputContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    marginTop: "2rem",
    marginBottom: "4rem",
    width: "85%",
});

const ExpenseInputForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
});

const ExpenseInputRow = styled("div")({
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
});

const ExpenseInputLabel = styled(InputLabel)({
    marginRight: "1rem",
    minWidth: "90px",
});

const ExpenseInputAmount = styled(TextField)({
    width: "120px",
});

const ExpenseDeleteText = styled(Typography)({
    color: "#000",
    cursor: "pointer",
    marginLeft: "0.5rem",
});

const ExpenseButton = styled(Button)({
    marginTop: "1rem",
    fontSize: "1rem",
    backgroundColor: "#009688",
    color: "white",
    border: "none",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#689F38",
    },
});

const ExpensesCount = styled(Typography)({
    marginBottom: '0.7rem',
    fontSize: '1.2rem',
});


const ExpenseParticipantList = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
        display: "flex",
        alignItems: "center",
    },
});

const ExpenseParticipant = styled(Chip)({
    margin: "0.5rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: "1rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    height: "2rem",
    "& .MuiChip-deleteIcon": {
        color: "#666",
        cursor: "pointer",
    },
    "& .MuiChip-label": {
        marginRight: "0.25rem",
    },
});

const ExpenseInputTable = styled("table")({
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
    margin: "auto",
    backgroundColor: "#fff",
    color: "#333",
    "& th, & td": {
        border: "1px solid #e0e0e0",
        padding: "8px",
        textAlign: "center",
    },
    "& th": {
        backgroundColor: "#f3f3f3",
    },
    "& tr:nth-of-type(even)": {
        backgroundColor: "#f7f7f7",
    },
});

const ExpenseInputTableHeader = styled("th")({
    backgroundColor: "#f3f3f3",
    border: "1px solid #e0e0e0",
    padding: "8px",
    textAlign: "center",
    "&:first-of-type": { // 지출 금액 열 스타일
        width: "18%",
    },
    "&:nth-of-type(2)": { // 결제한 사람 열 스타일
        width: "18%",
    },
    "&:nth-of-type(3)": { // 참여한 사람 열 스타일
        width: "36%",
    },
    "&:nth-of-type(4)": { // 지출 설명 열 스타일
        width: "18%",
    },
    "&:last-of-type": { // 마지막 열 스타일
        width: "10%",
        minWidth: "0",
    },
});


const ExpenseInputTableRow = styled("tr")({
    "&:nth-of-type(even)": {
        backgroundColor: "#f3f3f3",
    },
});

const ExpenseInputTableCell = styled("td")({
    border: "1px solid #e0e0e0",
    padding: "8px",
    textAlign: "center",
    "&:last-child": { // 마지막 열 스타일
        borderRight: "none",
        minWidth: "0"
    },
});


const ExpenseDeleteButton = styled(Button)({
    color: "#666",
    padding: "0.5rem",
    minWidth: "0",
    "&:hover": {
        backgroundColor: "transparent",
    },
});

function ExpenseInput(props) {
    const members = props.members;
    const [expenses, setExpenseInputs] = useState(props.expenseInputs || []);

    const handleAmountChange = (event, index) => {
        const newExpenses = [...expenses];
        newExpenses[index].amount = event.target.value;
        if (props.onChangeExpense) {
            props.onChangeExpense(newExpenses);
        }
        setExpenseInputs(newExpenses);
    };

    const handlePayerChange = (event, index) => {
        const newExpenses = [...expenses];
        newExpenses[index].payer = event.target.value;
        setExpenseInputs(newExpenses);
        if (props.onChangeExpense) {
            props.onChangeExpense(newExpenses);
        }
    };

    const handleParticipantToggle = (event, index, member) => {
        const newExpenses = [...expenses];
        if (event.target.checked) {
            newExpenses[index].participants.push(member);
        } else {
            newExpenses[index].participants = newExpenses[index].participants.filter(
                (participant) => participant !== member
            );
        }
        if (props.onChangeExpense) {
            props.onChangeExpense(newExpenses);
        }
        setExpenseInputs(newExpenses);
    };

    const handleDescriptionChange = (event, index) => {
        const newExpenses = [...expenses];
        newExpenses[index].description = event.target.value;
        if (props.onChangeExpense) {
            props.onChangeExpense(newExpenses);
        }
        setExpenseInputs(newExpenses);
    };

    useEffect(() => {
        const updatedExpenses = expenses.map(expense => ({
            ...expense,
            participants: expense.participants.filter(participant => props.members.includes(participant))
        }));

        setExpenseInputs(updatedExpenses);
        if (props.onChangeExpense) {
            props.onChangeExpense(updatedExpenses);
        }
    }, [props.members]);

    const handleAddExpense = () => {
        const newExpenses = [
            ...expenses,
            {
                amount: "",
                payer: "",
                participants: members,
                description: "",
            },
        ];
        if (props.onChangeExpense) {
            props.onChangeExpense(newExpenses);
        }
        setExpenseInputs(newExpenses);
    };

    const handleExpenseDelete = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        if (props.onChangeExpense) {
            props.onChangeExpense(newExpenses);
        }
        setExpenseInputs(newExpenses);
    };

    return (
        <ExpenseInputContainer>
            <ExpensesCount><b>정산 목록 (총 {expenses.length}건)</b></ExpensesCount>
            <ExpenseInputForm>
                <ExpenseInputTable>
                    <thead>
                    <ExpenseInputTableRow>
                        <ExpenseInputTableHeader>지출 금액</ExpenseInputTableHeader>
                        <ExpenseInputTableHeader>결제한 사람</ExpenseInputTableHeader>
                        <ExpenseInputTableHeader>참여한 사람</ExpenseInputTableHeader>
                        <ExpenseInputTableHeader>지출 설명(선택)</ExpenseInputTableHeader>
                        <ExpenseInputTableHeader/>
                    </ExpenseInputTableRow>
                    </thead>
                    <tbody>
                    {expenses.map((expense, index) => (
                        <ExpenseInputTableRow key={index}>
                            <ExpenseInputTableCell>
                                <ExpenseInputAmount
                                    type="number"
                                    label="Amount"
                                    variant="outlined"
                                    size="medium"
                                    value={expense.amount}
                                    onChange={(event) => handleAmountChange(event, index)}
                                    InputProps={{inputProps: {min: 0, max: 99999999}}}
                                />
                            </ExpenseInputTableCell>
                            <ExpenseInputTableCell>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id={`payer-${index}-label`}>Payer</InputLabel>
                                    <Select
                                        labelId={`payer-${index}-label`}
                                        id={`payer-${index}`}
                                        value={expense.payer}
                                        onChange={(event) => handlePayerChange(event, index)}
                                        label="Payer"
                                    >
                                        {members.map((member) => (
                                            <MenuItem key={member} value={member}>
                                                {member}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ExpenseInputTableCell>
                            <ExpenseInputTableCell>
                                <ExpenseParticipantList>
                                    {members.map((member) => (
                                        <ParticipantCheckboxContainer key={member}>
                                            <FormControlLabel
                                                control={
                                                    <ParticipantCheckbox
                                                        checked={expense.participants.includes(member)}
                                                        onChange={(event) =>
                                                            handleParticipantToggle(event, index, member)
                                                        }
                                                        name={`participant-${index}-${member}`}
                                                        color="primary"
                                                    />
                                                }
                                                label={<ParticipantLabel>{member}</ParticipantLabel>}
                                            />
                                        </ParticipantCheckboxContainer>
                                    ))}
                                </ExpenseParticipantList>
                            </ExpenseInputTableCell>
                            <ExpenseInputTableCell>
                                <ExpenseInputAmount
                                    label="Description (Optional)"
                                    value={expense.description}
                                    onChange={(event) => handleDescriptionChange(event, index)}
                                />
                            </ExpenseInputTableCell>
                            <ExpenseInputTableCell>
                                <ExpenseDeleteButton onClick={() => handleExpenseDelete(index)}>
                                    <DeleteOutline/>
                                </ExpenseDeleteButton>
                            </ExpenseInputTableCell>
                        </ExpenseInputTableRow>
                    ))}
                    </tbody>
                </ExpenseInputTable>
                <ExpenseButton variant="contained" onClick={handleAddExpense}>
                    정산 목록 추가
                </ExpenseButton>
            </ExpenseInputForm>
        </ExpenseInputContainer>
    );
}


export default ExpenseInput;    