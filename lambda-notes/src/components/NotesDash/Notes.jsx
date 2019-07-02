import React from 'react';
import styled from 'styled-components';
import Note from './Note';

const Notes = () => {
    return (
        <Styles>
            <Note />
        </Styles>
    );
};

export default Notes;

const Styles = styled.div`
    background: white;
    width: 100%;
`;
