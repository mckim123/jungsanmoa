import React, {useState} from "react";
import axios from "axios";
import {CssBaseline, Divider, Typography, useMediaQuery,} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useTheme} from "@mui/system";
import Members from "./components/Members";
import ExpenseInput from "./components/ExpenseInput";
import TruncateOption from "./components/TruncateOption";
import JungsanReport from "./components/JungsanReport";

const API_ENDPOINT = "/";
const LOCAL_API_ENDPOINT = "http://localhost:8080";

const HeadingTitle = styled(Typography)({
    fontSize: "2.5rem",
    fontWeight: "bold",
});

const HeadingSubtitle = styled(Typography)({
    fontSize: "1.2rem",
});

const HeadingContainer = styled("div")({
    textAlign: "center",
    marginTop: "4rem",
    marginBottom: "2rem",
});

const AppContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

function Heading() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const HeadingTitleSmall = styled(HeadingTitle)({
        fontSize: "1.6rem",
    });

    const HeadingSubtitleSmall = styled(HeadingSubtitle)({
        fontSize: "0.9rem",
    });

    return (
        <HeadingContainer>
            {isSmallScreen ? (
                <>
                    <HeadingTitleSmall variant="h1" gutterBottom>
                        정산모아
                    </HeadingTitleSmall>
                    <HeadingSubtitleSmall variant="subtitle1">
                        모임, 회식, 데이트 등의 복잡한 정산을 손쉽게 진행해보세요. <br/>
                        멤버 추가 후, 정산 항목을 입력하세요.
                    </HeadingSubtitleSmall>
                </>
            ) : (
                <>
                    <HeadingTitle variant="h1" gutterBottom>
                        정산모아
                    </HeadingTitle>
                    <HeadingSubtitle variant="subtitle1">
                        모임, 회식, 데이트 등의 복잡한 정산을 손쉽게 진행해보세요. <br/>
                        멤버 추가 후, 정산 항목을 입력하세요.
                    </HeadingSubtitle>
                </>
            )}
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

        return amount > 0 && payer !== "" && participants.length > 0;
    };

    const handleSubmit = (value) => {
        const invalidExpense = expenseInputs.find((expense) => !isValidExpense(expense));

        if (invalidExpense) {
            alert("지출 항목에 유효하지 않은 값이 있습니다. 확인 후 다시 시도해주세요.");
            return;
        }

        const totalAmount = expenseInputs.reduce((sum, expense) => sum + Number(expense.amount), 0);

        let truncationValue;
        switch (value) {
            case "TEN":
                truncationValue = 10;
                break;
            case "HUNDRED":
                truncationValue = 100;
                break;
            case "THOUSAND":
                truncationValue = 1000;
                break;
            default:
                truncationValue = 1;
        }
        console.log(totalAmount);
        console.log(truncationValue);

        if (totalAmount % truncationValue !== 0) {
            alert("금액의 총합은 정산단위로 나누어떨어져야합니다.");
            return;
        }


        setTruncateOption(value);

        const data = {
            members: members,
            expenses: expenseInputs,
            truncationOption: value,
            advanceTransfers: [],
        };
        console.log(data);

        axios
            .post(LOCAL_API_ENDPOINT, data)
            .then((response) => {
                console.log(response);
                setJungsanData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Heading/>
            <AppContainer>
                <Members
                    members={members}
                    onAddMember={handleAddMember}
                    onRemoveMember={handleRemoveMember}/>
                <ExpenseInput
                    members={members}
                    expenseInputs={expenseInputs}
                    onChangeExpense={handleChangeExpense}
                    setExpenseInputs={setExpenseInputs}
                />
                <TruncateOption onSubmit={handleSubmit}/>
                {jungsanData && (
                    <>
                        <Divider sx={{width: "100%"}}/>
                        <JungsanReport data={jungsanData}/>
                    </>
                )}
            </AppContainer>
        </React.Fragment>
    );
}

export default App;