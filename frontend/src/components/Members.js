import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Grid, TextField, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';

function Members(props) {
    const [name, setName] = useState('');
    const [members, setMembers] = useState(props.members || []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddMember = () => {
        if (name && members.indexOf(name) === -1) {
            const newMembers = [...members, name];
            setMembers(newMembers);
            setName("");
            if (props.onAddMember) {
                props.onAddMember(name);
            }
            if (props.setMembers) {
                props.setMembers(newMembers);
            }
        }
    };

    const handleRemoveMember = (memberToRemove) => () => {
        const newMembers = members.filter((member) => member !== memberToRemove);
        setMembers(newMembers);
        if (props.onRemoveMember) {
            props.onRemoveMember(memberToRemove);
        }
        if (props.setMembers) {
            props.setMembers(newMembers);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddMember();
        }
    };

    useEffect(() => {
        setMembers(props.members || []);
    }, [props.members]);

    return (
        <>
            <CssBaseline/>
            <Box sx={{marginBottom: '2rem'}}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            fullWidth
                            label="멤버 추가"
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={handleNameChange}
                            onKeyDown={handleKeyDown}
                            inputProps={{
                                style: {textAlign: 'center'},
                            }}/>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <Button fullWidth variant="contained" onClick={handleAddMember}>
                            추가
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{marginBottom: '0.5rem'}}>
                <Typography variant="h6">
                    <b>멤버 목록 (총 {members.length}명)</b>
                </Typography>
            </Box>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem'}}>
                {members.map((member) => (
                    <Box key={member} sx={{margin: '0.25rem'}}>
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            endIcon={<Close/>}
                            sx={{textTransform: 'none', fontSize: '1rem'}}
                            onClick={handleRemoveMember(member)}
                        >
                            {member}
                        </Button>
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default Members;