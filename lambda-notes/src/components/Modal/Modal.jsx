import React from 'react';
import styled from 'styled-components';

const Modal = () => {
  return (
    <Styles>
      <div className="modal__box">
        <h1>Title</h1>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  padding: 0 5%;
  background: #13122099;
  z-index: 50;

  .modal__box {
    width: 100%;
    max-width: 600px;
    height: 500px;
    margin: 15vh auto 0;
    background: white;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.14);
    -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.14);
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.14);

    h1 {
    }
  }
`;

export default Modal;
