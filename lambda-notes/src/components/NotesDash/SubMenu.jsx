import React from 'react';
import styled from 'styled-components';

const SubMenu = () => {
    const newNote = () => {
        return;
    };
    return (
        <Styles>
            <h1>SubMenu</h1>
            <button onClick={newNote}>New Note</button>
        </Styles>
    );
};

export default SubMenu;

const Styles = styled.div`
    width: 220px;
`;
