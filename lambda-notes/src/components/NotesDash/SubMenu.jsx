import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Value } from 'slate';

import { url } from '../Auth/config';
import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { SET_CURRENT_NOTE, NEW_NOTE } from '../../store/constants';

const SubMenu = ({ notes }) => {
  const [state, dispatch] = useStateValue(notesContext);

  const setCurrentNote = id => {
    let note = state.notes.find(note => {
      return note.id === id;
    });

    // console.log(JSON.stringify(note.note));

    dispatch({
      type: SET_CURRENT_NOTE,
      payload: note
    });
  };
  const newNote = e => {
    e.preventDefault();
    localStorage.clear();
    dispatch({ type: NEW_NOTE, payload: true });
  };
  return (
    <Styles>
      <button className="btn success" onClick={newNote}>
        New Note
      </button>
      <div className="header">
        <h4 className="title">Title</h4>
        <h4>Updated</h4>
      </div>
      {notes.map(note => {
        return (
          <Link
            to={`/dashboard/${note.id}`}
            onClick={() => setCurrentNote(note.id)}
            className="note"
            key={note.id}
          >
            <p>{note.noteTitle}</p>
            <p>{note.dateUpdated}</p>
          </Link>
        );
      })}
    </Styles>
  );
};

export default SubMenu;

const Styles = styled.div`
  width: 250px;
  background: #f8f8f8;

  .header {
    display: flex;
    padding: 5px 10px;
    border-bottom: 1px solid grey;
    font-size: 1.2rem;
    font-weight: 700;

    .title {
      width: 65%;
    }
  }

  .note {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    padding: 3px 10px;

    &:nth-child(even) {
      background: #f8f8f8;
    }

    &:nth-child(odd) {
      background: #f4f4f4;
    }
  }
`;
