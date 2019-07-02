import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { url } from '../Auth/config';

// component imports
import SubMenu from './SubMenu';
import Notes from './Notes';

const NotesDash = () => {
    const [state, dispatch] = useStateValue(notesContext);
    const { notes } = state;

    // console.log(notes);

    useEffect(() => {
        axios
            .get(`${url}/notes/user/2`)
            .then(res =>
                dispatch({ type: 'GET_NOTES', payload: res.data.notes })
            )
            .catch(err => dispatch({ type: 'GET_NOTES_FAIL', payload: err }));
    }, [dispatch]);

    const updateNote = (id, note) => {
        axios
            .put(`${url}/notes/${id}`, note)
            .then(res =>
                dispatch({
                    type: 'UPDATE_NOTE',
                    payload: res.data /* maybe? */
                })
            )
            .catch(err => dispatch({ type: 'UPDATE_NOTE_FAIL', payload: err }));
    };

    const deleteNote = id => {
        axios
            .delete(`${url}/notes/${id}`)
            .then(res =>
                dispatch({
                    type: 'GET_NOTES',
                    payload: res.data /* confirmation? */
                })
            )
            .catch(err => dispatch({ type: 'GET_NOTES_FAIL', payload: err }));
    };

    return (
        <Styles>
            <SubMenu notes={notes} />
            <Notes notes={notes} />
        </Styles>
    );
};

export default NotesDash;

const Styles = styled.div`
    display: flex;
    height: calc(100vh - 70px);
`;
