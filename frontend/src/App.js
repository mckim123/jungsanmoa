import React, {useState} from "react";
import axios from "axios";
import {CssBaseline, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Members from "./components/Members";
import ExpenseInput from "./components/ExpenseInput";
import TruncateOption from "./components/TruncateOption";
import JungsanReport from './components/JungsanReport';

const HeadingContainer = styled("div")({
    textAlign: "center",
    marginTop: "4rem",
    marginBottom: "2rem",
});

const HeadingTitle = styled(Typography)({
    fontSize: "2.5rem",
    fontWeight: "bold",
});

const HeadingSubtitle = styled(Typography)({
    fontSize: "1.2rem",
});

const AppContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

function Heading() {
    return (
        <HeadingContainer>
            <HeadingTitle variant="h1" gutterBottom>
                정산모아
            </HeadingTitle>
            <HeadingSubtitle variant="subtitle1">
                모임, 회식, 데이트 등의 복잡한 정산을 손쉽게 진행해보세요. <br/>
                멤버 추가 후, 정산 항목을 입력하세요.
            </HeadingSubtitle>
        </HeadingContainer>
    );
}

function App() {
    const [members, setMembers] = React.useState([]);
    const [expenseInputs, setExpenseInputs] = React.useState([]);
    const [truncateOption, setTruncateOption] = React.useState("ONE");
    const [jungsanData, setJungsanData] = useState(null);

    const handleAddMember = (newMember) => {
        if (newMember && members.indexOf(newMember) === -1) {
            setMembers([...members, newMember]);
        }
    };

    const handleRemoveMember = (memberToRemove) => {
        setMembers(members.filter((member) => member !== memberToRemove));
    };


    const handleChangeExpense = (expenses) => {
        setExpenseInputs(expenses);
    };


    const isValidExpense = (expense) => {
        const {amount, payer, participants} = expense;

        return (
            amount > 0 &&
            payer !== "" &&
            participants.length > 0
        );
    };


    const handleSubmit = (value) => {
        const invalidExpense = expenseInputs.find((expense) => !isValidExpense(expense));

        if (invalidExpense) {
            alert("지출 항목에 유효하지 않은 값이 있습니다. 확인 후 다시 시도해주세요.");
            return;
        }

        setTruncateOption(value);

        const data = {
            members: members,
            expenses: expenseInputs,
            truncationOption: value,
            advanceTransfers: [],
        };

        axios
            .post("http://localhost:8080", data)
            .then((response) => {
                setJungsanData(response.data);
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    };


    return (
        <React.Fragment>
            <CssBaseline/>
            <Heading/>
            <AppContainer>
                <Members
                    members={members}
                    onAddMember={handleAddMember}
                    onRemoveMember={handleRemoveMember}
                    setMembers={setMembers}
                />
                {(
                    <React.Fragment>
                        <ExpenseInput
                            members={members}
                            expenseInputs={expenseInputs}
                            onChangeExpense={handleChangeExpense}
                            setExpenseInputs={setExpenseInputs}
                        />
                    </React.Fragment>
                )}
                <TruncateOption onSubmit={handleSubmit}/>
                {jungsanData && (
                    <>
                        <hr/>
                        <JungsanReport data={jungsanData}/>
                    </>
                )}
            </AppContainer>
        </React.Fragment>
    );
}

export default App;
