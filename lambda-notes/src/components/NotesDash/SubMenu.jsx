import React from 'react';
import styled from 'styled-components';

const SubMenu = ({ notes }) => {
    return (
        <Styles>
            <div className="header">
                <h4 className="title">Title</h4>
                <h4>Updated</h4>
            </div>
            {notes.map(note => {
                return (
                    <div className="note" key={note.dateCreated}>
                        <p>{note.noteTitle}</p>
                        <p>{note.dateUpdated}</p>
                    </div>
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
