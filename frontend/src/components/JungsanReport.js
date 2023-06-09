import React, {useState} from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";

import html2canvas from 'html2canvas';

function JungsanReport({data}) {
    const {members, expenseResponses, advanceTransfers, transfers} = data;
    const [showDetails, setShowDetails] = useState(false);
    const [showExpenseDetails, setShowExpenseDetails] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState(new Set());
    const [selectedRadio, setSelectedRadio] = useState('all');

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleExpenseDetails = () => {
        setShowExpenseDetails(!showExpenseDetails);
    };

    const renderTransfers = () => {
        if (selectedRadio === 'all') {
            return transfers;
        } else {
            return transfers.filter((transfer) => transfer.from === selectedRadio || transfer.to === selectedRadio);
        }
    };

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

    const handleExportClick = () => {
        html2canvas(document.getElementById("jungsan-report")).then(canvas => {
            const link = document.createElement('a');
            link.download = 'jungsan-report.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <div id="jungsan-report" style={{width: '90%', margin: 'auto', marginTop: '3rem', marginBottom: '7rem'}}>
            <h3 style={{textAlign: 'center', fontSize: '1.8rem'}}>정산 결과</h3>
            <p style={{textAlign: 'center', fontSize: '1rem'}}>반올림 금액이 -인 경우 받아야하는 금액입니다.</p>
            <Table style={{margin: 'auto', fontSize: '1.3em'}}>
                <TableHead>
                    <TableRow style={{backgroundColor: '#efefef'}}>
                        <TableCell style={{width: '10%', textAlign: 'center'}}></TableCell>
                        {members.map((member) => (
                            <TableCell
                                key={member.name}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: selectedMembers.has(member.name) ? 'yellow' : 'inherit'
                                }}
                            >
                                {member.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showDetails && (
                        <>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}>지불한 금액</TableCell>
                                {members.map((member) => (
                                    <TableCell style={{textAlign: 'center'}}
                                               key={member.name}>{member.totalActualPayment.toLocaleString()}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}>분담 금액</TableCell>
                                {members.map((member) => (
                                    <TableCell style={{textAlign: 'center'}}
                                               key={member.name}>{member.totalActualDivision.toLocaleString()}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}>송금한 금액</TableCell>
                                {members.map((member) => (
                                    <TableCell style={{textAlign: 'center'}}
                                               key={member.name}>{member.totalAdvancedTransfer.toLocaleString()}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}>미리 받은 금액</TableCell>
                                {members.map((member) => (
                                    <TableCell style={{textAlign: 'center'}}
                                               key={member.name}>{member.totalAdvancedReceived.toLocaleString()}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}>최종 보낼 금액</TableCell>
                                {members.map((member) => (
                                    <TableCell style={{textAlign: 'center'}}
                                               key={member.name}>{member.remaining.toLocaleString()}</TableCell>
                                ))}
                            </TableRow>

                        </>
                    )}
                    <TableRow>
                        <TableCell style={{textAlign: 'center'}}>반올림 금액</TableCell>
                        {members.map((member) => (
                            <TableCell style={{textAlign: 'center'}}
                                       key={member.name}>{member.roundedRemaining.toLocaleString()}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={toggleDetails} style={{display: 'block', margin: 'auto', fontSize: '1rem'}}>
                {showDetails ? '상세 내용 닫기' : '상세 내용 보기'}
            </Button>
            <h3 style={{textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem'}}>정산 목록</h3>

            {showExpenseDetails && (
                <Table style={{margin: 'auto', marginTop: '1rem', fontSize: '1.4rem'}}>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#efefef'}}>
                            <TableCell style={{width: '15%', textAlign: 'center'}}>납부자</TableCell>
                            <TableCell style={{width: '25%', textAlign: 'center'}}>참여자</TableCell>
                            <TableCell style={{width: '15%', textAlign: 'center'}}>금액</TableCell>
                            <TableCell style={{width: '30%', textAlign: 'center'}}>설명</TableCell>
                            <TableCell style={{width: '15%', textAlign: 'center'}}>분할</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenseResponses.map((expense, index) => (
                            <TableRow key={index}>
                                <TableCell style={{textAlign: 'center'}}>{expense.payer}</TableCell>
                                <TableCell style={{textAlign: 'center'}}>{expense.participants.join(', ')}</TableCell>
                                <TableCell style={{textAlign: 'center'}}>{expense.amount.toLocaleString()}</TableCell>
                                <TableCell style={{
                                    width: '30%',
                                    textAlign: 'center',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all'
                                }}>
                                    {expense.description || '없음'}
                                </TableCell>
                                <TableCell style={{
                                    width: '15%',
                                    textAlign: 'center',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all'
                                }}>
                                    {Object.entries(expense.divisions)
                                        .map(([name, amount]) => `${name}: ${amount.toLocaleString()}`)
                                        .join('\n')}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Button onClick={toggleExpenseDetails} style={{display: 'block', margin: 'auto', fontSize: '1rem'}}>
                {showExpenseDetails ? '지출 내역 닫기' : '지출 내역 보기'}
            </Button>

            <h3 style={{textAlign: 'center', marginTop: '3.5rem', fontSize: '1.8rem'}}>최종 정산 목록</h3>

            <Grid container justifyContent="center">
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="select"
                        value={selectedRadio}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="all" control={<Radio/>} label="전체"/>
                        {members.map((member) => (
                            <FormControlLabel
                                key={member.name}
                                value={member.name}
                                control={<Radio/>}
                                label={member.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Table style={{margin: 'auto', marginTop: '1rem', fontSize: '1.4rem'}}>
                <TableHead>
                    <TableRow style={{backgroundColor: '#efefef'}}>
                        <TableCell style={{width: '15%', textAlign: 'center'}}>보내는 사람</TableCell>
                        <TableCell style={{width: '15%', textAlign: 'center'}}>받는 사람</TableCell>
                        <TableCell style={{width: '20%', textAlign: 'center'}}>금액</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTransfers().map((transfer, index) => (
                        <TableRow key={index}>
                            <TableCell style={{textAlign: 'center'}}>{transfer.from}</TableCell>
                            <TableCell style={{textAlign: 'center'}}>{transfer.to}</TableCell>
                            <TableCell style={{textAlign: 'center'}}>{transfer.amount.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button onClick={handleExportClick} style={{display: 'block', margin: 'auto', fontSize: '1rem'}}>
                Export to Image (현재 보고 있는 화면이 출력됩니다.)
            </Button>
        </div>)
}

export default JungsanReport;

