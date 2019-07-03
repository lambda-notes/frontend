import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { SET_CURRENT_NOTE } from '../../store/constants';

const SubMenu = ({ notes }) => {
  const [state, dispatch] = useStateValue(notesContext);

  const setCurrentNote = (id, e) => {
    e.preventDefault();
    let note = state.notes.find(note => {
      return note.id === id;
    });

    // console.log(JSON.stringify(note.note));

    dispatch({
      type: SET_CURRENT_NOTE,
      payload: note
    });
  };
  return (
    <Styles>
      <div className="header">
        <h4 className="title">Title</h4>
        <h4>Updated</h4>
      </div>
      {notes.map(note => {
        return (
          <Link
            to={`/dashboard/${note.id}`}
            onClick={e => setCurrentNote(note.id, e)}
            className="note"
            key={note.id}
          >
            <p className="noteLink">{note.noteTitle}</p>
            <p className="noteLink">{note.dateUpdated}</p>
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

  button {
    width: 90%;
    margin: 10px 5%;
  }

  .header {
    display: flex;
    border-bottom: 1px solid grey;
    padding: 5px 10px;
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 38px;

    .title {
      width: 65%;
    }
  }

  .note {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 10px 10px;
    color: black;

    &:nth-child(even) {
      background: #f8f8f8;
      &:hover {
        background-color: #880c23;
        color: #fff;
      }
    }

    &:nth-child(odd) {
      background: #f4f4f4;
      &:hover {
        background-color: #880c23;
        color: #fff;
      }
    }
  }
`;
