import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

const SPLIT_OPTIONS = [
    {value: 'DEFAULT', label: '기본', description: '사람 인원수로 나누어 정산합니다.'},
    {value: 'DONE', label: '정산 완료', description: '이미 정산이 완료된 경우입니다.\n정산 내역에만 추가됩니다.'},
    {
        value: 'RATE_CHANGE',
        label: '비율 조정',
        description: '일부 인원의 정산 비율을 지정할 수 있습니다.\n기준은 1이며, 예를 들어 남들의 70%만 내기로 했다면 0.7을 입력해주세요.'
    },
    {
        value: 'VALUE_CHANGE',
        label: '가격 조정',
        description: '일부 인원의 가격을 조정할 수 있습니다.\n5000원을 더 내기로 한 경우 5000을, 덜 내는 경우 -5000을 입력해주세요.'
    },
    {value: 'SET_DIVISION', label: '가격 지정', description: '정해진 금액을 내기로 한 인원이 있다면 해당 입력란에 금액을 입력해주세요.'},
    {value: 'DRINK_SEPARATE', label: '주류 별도', description: '술 값은 따로 정산하기로 한 경우입니다.\n술을 마신 사람을 체크하고, 술 값을 입력해주세요.'},
    {value: 'TREAT', label: '쏜다', description: '결제자가 쏘기로 한 경우입니다.'},];

function ExpenseInput(props) {
    const [expenseInputs, setExpenseInputs] = useState(props.expenseInputs || []);
    const onChangeExpense = props.onChangeExpense;
    const members = props.members;
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const getDefaultExpense = () => ({
        description: '',
        amount: '',
        payer: '',
        participants: members,
        splitOption: 'DEFAULT',
        splitDetails: {},
        drinkAmount: '',
    });
    const [expense, setExpense] = useState(getDefaultExpense());

    useEffect(() => {
        const updateExpensesForRemovedMembers = () => {
            const updatedExpenses = expenseInputs.map((expense) => {
                const updatedParticipants = expense.participants.filter((participant) =>
                    members.includes(participant)
                );
                const updatedSplitDetails = Object.fromEntries(
                    Object.entries(expense.splitDetails).filter(([key]) =>
                        members.includes(key)
                    )
                );
                const updatedPayer = members.includes(expense.payer) ? expense.payer : '';

                return {
                    ...expense,
                    payer: updatedPayer,
                    participants: updatedParticipants,
                    splitDetails: updatedSplitDetails,
                };
            });

            onChangeExpense(updatedExpenses);
            setExpenseInputs(updatedExpenses);
        };

        updateExpensesForRemovedMembers();
    }, [members]);

    const handleChange = (e, field) => {
        if (field === 'splitOption') {
            setExpense({
                ...expense,
                [field]: e.target.value,
                splitDetails: {},
                drinkAmount: '',
            });
        } else {
            setExpense({...expense, [field]: e.target.value});
        }
    };

    const handleToggleParticipant = (participant) => {
        const updatedParticipants = [...expense.participants];
        if (updatedParticipants.includes(participant)) {
            const index = updatedParticipants.indexOf(participant);
            updatedParticipants.splice(index, 1);
        } else {
            updatedParticipants.push(participant);
        }
        setExpense({...expense, participants: updatedParticipants});
    };

    const handleSave = () => {
        if (editIndex === -1) {
            onChangeExpense([...expenseInputs, expense]);
            setExpenseInputs([...expenseInputs, expense]);
        } else {
            const updatedExpenses = [...expenseInputs];
            updatedExpenses[editIndex] = expense;
            onChangeExpense(updatedExpenses);
            setExpenseInputs(updatedExpenses);
            setEditIndex(-1);
        }
        handleClose();
    };
    const handleEdit = (index) => {
        setEditIndex(index);
        setExpense(expenseInputs[index]);
        setOpen(true);
    };
    const handleDelete = (index) => {
        const updatedExpenses = [...expenseInputs];
        updatedExpenses.splice(index, 1);
        onChangeExpense(updatedExpenses);
        setExpenseInputs(updatedExpenses);
    };
    const handleClose = () => {
        setOpen(false);
        setExpense(getDefaultExpense());
    };
    const handleOpen = () => {
        setExpense(getDefaultExpense());
        setOpen(true);
    };

    const getParticipantsDisplay = (participants) => {
        const visibleCount = 4;
        const displayArray = participants.slice(0, visibleCount);
        const remainingCount = participants.length - visibleCount;
        const badge = remainingCount > 0 ? (
            <Badge badgeContent={`+${remainingCount}`} color="primary">
                <IconButton disabled/>
            </Badge>
        ) : null;
        return {displayArray, badge};
    };

    return (
        <div>
            <Typography variant="h6" align="center" gutterBottom>
                <b>정산 목록 (총 {expenseInputs.length}건)</b>
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign: 'center', padding: '0.3rem 0.7rem'}}>지출 설명</TableCell>
                            <TableCell style={{textAlign: 'center', padding: '0.3rem 0.7rem'}}>금액</TableCell>
                            <TableCell style={{textAlign: 'center', padding: '0.3rem 0.8rem'}}>결제한 사람</TableCell>
                            <TableCell style={{textAlign: 'center', padding: '0.3rem 1rem'}}>참여한 사람</TableCell>
                            <TableCell style={{textAlign: 'center', padding: '0.3rem 0.5rem'}}>정산 방식</TableCell>
                            <TableCell style={{textAlign: 'center', padding: '0.3rem 2rem'}}>수정</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenseInputs.map(
                            (expense, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{textAlign: 'center'}}>{expense.description}</TableCell>
                                    <TableCell
                                        style={{textAlign: 'center'}}>{expense.amount.toLocaleString()}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>{expense.payer}</TableCell>
                                    <TableCell style={{textAlign: 'center', padding: '0.2rem'}}>
                                        {getParticipantsDisplay(expense.participants).displayArray.join(', ')}
                                        {getParticipantsDisplay(expense.participants).badge}
                                    </TableCell>
                                    <TableCell
                                        style={{textAlign: 'center'}}> {SPLIT_OPTIONS.find((option) => option.value === expense.splitOption).label} </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(index)}> <Edit/> </IconButton>
                                        <IconButton onClick={() => handleDelete(index)}> <Delete/> </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '3rem'}}>
                <Button variant="contained" onClick={handleOpen}> 내역 추가 </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{
                    textAlign: 'center',
                    paddingTop: '1.5rem',
                    paddingBottom: '1.5rem'
                }}><b>{editIndex === -1 ? '내역 추가' : '내역 수정'}</b></DialogTitle>
                <DialogContent>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                        <Typography variant="body1"
                                    style={{textAlign: 'center', marginRight: '0.7rem', lineHeight: '1.2rem'}}>지출
                            설명<br/>(선택)</Typography>
                        <TextField type='text' inputProps={{style: {padding: '0.75rem 1rem'},}}
                                   style={{width: '8rem', marginLeft: 'auto'}} value={expense.description}
                                   onChange={(e) => handleChange(e, 'description')}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                        <Typography variant="body1" style={{marginLeft: '1rem'}}>금액</Typography>
                        <TextField type="number" inputProps={{min: 0, max: 99999999, style: {padding: '0.75rem 1rem'},}}
                                   style={{width: '8rem', marginLeft: 'auto'}} value={expense.amount}
                                   onChange={(e) => handleChange(e, 'amount')}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                        <Typography variant="body1" style={{marginLeft: '0.7rem'}}>결제자</Typography>
                        <Select style={{width: '8rem', marginLeft: 'auto', type: 'text'}} value={expense.payer}
                                onChange={(e) => handleChange(e, 'payer')}>
                            {members.map((member, index) => (
                                <MenuItem key={index} value={member}>
                                    {member}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Typography style={{textAlign: 'center', padding: '0.2rem 0'}} variant="subtitle1" gutterBottom>
                        참여한 사람
                    </Typography>
                    <div style={{alignItems: 'center', textAlign: 'center', paddingBottom: '2rem'}}>
                        {members.map((member, index) => (
                            <Button style={{margin: '0.1rem'}}
                                    key={index}
                                    variant={expense.participants.includes(member) ? 'contained' : 'outlined'}
                                    onClick={() => handleToggleParticipant(member)}>
                                {member}
                            </Button>
                        ))}
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                        <Typography variant="body1" style={{marginLeft: '0.2rem'}}>
                            정산 방식
                        </Typography>
                        <Select
                            style={{width: '8rem', marginLeft: 'auto'}}
                            value={expense.splitOption}
                            onChange={(e) => handleChange(e, 'splitOption')}
                        >
                            {SPLIT_OPTIONS.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Typography variant="body2" gutterBottom style={{textAlign: 'center', padding: '1rem 0'}}>
                        {SPLIT_OPTIONS.find((option) => option.value === expense.splitOption).description}
                    </Typography>

                    {expense.splitOption === 'RATE_CHANGE' && (
                        <div>
                            {expense.participants.map((participant, index) => (
                                <div key={index}
                                     style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                                    <Typography variant="body1" style={{marginLeft: '2rem'}}> {participant}</Typography>

                                    <TextField type="number"
                                               inputProps={{min: 0.2, max: 5, style: {padding: '0.75rem 1rem'}}}
                                               style={{width: '6rem', marginLeft: 'auto', marginRight: '1.1rem'}}
                                               value={expense.splitDetails[participant] || ''} onChange={(e) => {
                                        const updatedSplitDetails = {
                                            ...expense.splitDetails,
                                            [participant]: e.target.value,
                                        };
                                        setExpense({
                                            ...expense,
                                            splitDetails: updatedSplitDetails,
                                        });
                                    }}/>
                                </div>
                            ))}
                        </div>
                    )}

                    {expense.splitOption === 'VALUE_CHANGE' && (
                        <div>
                            {expense.participants.map((participant, index) => (
                                <div key={index}
                                     style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                                    <Typography variant="body1" style={{marginLeft: '2rem'}}> {participant}</Typography>

                                    <TextField type="number" inputProps={{
                                        min: -1000000,
                                        max: 1000000,
                                        style: {padding: '0.75rem 1rem'}
                                    }} style={{width: '8rem', marginLeft: 'auto'}}
                                               value={expense.splitDetails[participant] || ''} onChange={(e) => {
                                        const updatedSplitDetails = {
                                            ...expense.splitDetails,
                                            [participant]: e.target.value,
                                        };
                                        setExpense({
                                            ...expense,
                                            splitDetails: updatedSplitDetails,
                                        });
                                    }}/>
                                </div>
                            ))}
                        </div>
                    )}

                    {expense.splitOption === 'SET_DIVISION' && (
                        <div>
                            {expense.participants.map((participant, index) => (
                                <div key={index}
                                     style={{display: 'flex', alignItems: 'center', marginBottom: '0.8rem'}}>
                                    <Typography variant="body1" style={{marginLeft: '2rem'}}> {participant}</Typography>

                                    <TextField type="number"
                                               inputProps={{min: 0, max: 1000000, style: {padding: '0.75rem 1rem'}}}
                                               style={{width: '8rem', marginLeft: 'auto'}}
                                               value={expense.splitDetails[participant] || ''} onChange={(e) => {
                                        const updatedSplitDetails = {
                                            ...expense.splitDetails,
                                            [participant]: e.target.value,
                                        };
                                        setExpense({
                                            ...expense,
                                            splitDetails: updatedSplitDetails,
                                        });
                                    }}/>
                                </div>
                            ))}
                        </div>
                    )}

                    {
                        expense.splitOption === 'DRINK_SEPARATE' && (
                            <div>
                                {expense.participants.map((participant, index) => (
                                    <div key={index} style={{marginLeft: '1rem'}}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!!expense.splitDetails[participant]}
                                                    onChange={() => {
                                                        const updatedSplitDetails = {
                                                            ...expense.splitDetails,
                                                            [participant]: 1,
                                                        };
                                                        setExpense({
                                                            ...expense,
                                                            splitDetails: updatedSplitDetails,
                                                        });
                                                    }}
                                                />
                                            }
                                            label={participant}
                                        />
                                    </div>
                                ))}
                                <div style={{display: 'flex', alignItems: 'center', margin: '1rem 0'}}>
                                    <Typography variant="body1" style={{marginLeft: '1rem'}}>주류 가격</Typography>
                                    <TextField type="number"
                                               inputProps={{min: 0, max: 99999999, style: {padding: '0.75rem 1rem'},}}
                                               style={{width: '8rem', marginLeft: 'auto'}} value={expense.drinkAmount}
                                               onChange={(e) => handleChange(e, 'drinkAmount')}/>
                                </div>
                            </div>
                        )
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleSave}>{editIndex === -1 ? '저장' : '수정'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExpenseInput;