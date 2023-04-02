import React, {useEffect, useState} from 'react';
import {Button, Chip, CssBaseline, TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Close} from '@mui/icons-material';

const MembersContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
});

const MembersInputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
});

const MembersInput = styled(TextField)({
    margin: '0 1rem',
    minWidth: '150px',
});

const MembersButton = styled(Button)({
    fontSize: '1rem',
    backgroundColor: '#009688',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#689F38',
    },
});

const MembersList = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
});

const MembersItem = styled(Chip)({
    margin: '1rem 1rem 1rem 0',
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: '1rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.2rem',
    height: '2rem',
    flexWrap: 'nowrap',
    overflow: 'hidden',
});

const MembersCount = styled(Typography)({
    marginTop: '0.5rem',
    fontSize: '1.2rem',
});

const MembersItemText = styled(Typography)({
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '0.25rem',
    height: '100%',
});

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
            <MembersContainer>
                <MembersInputContainer>
                    <MembersInput
                        label="멤버 추가"
                        variant="outlined"
                        size="small"
                        value={name}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown}
                    />
                    <MembersButton variant="contained" onClick={handleAddMember}>
                        추가
                    </MembersButton>
                </MembersInputContainer>
                <MembersCount>
                    <b>멤버 목록 (총 {members.length}명)</b>
                </MembersCount>
                <MembersList>
                    {members.map((member) => (
                        <MembersItem
                            key={member}
                            label={<MembersItemText>{member}</MembersItemText>}
                            onDelete={handleRemoveMember(member)}
                            deleteIcon={<Close/>}
                        />
                    ))}
                </MembersList>
            </MembersContainer>
        </>
    );
}

export default Members;
  