import React from 'react';
import styled from 'styled-components';

const Modal = ({ text, route }) => {
  const handleRoute = e => {
    e.preventDefault();
  };
  return (
    <Styles>
      <div className="modal__box">
        <h1>{text ? text : 'Something went wrong'}</h1>
        <button onClick={handleRoute} className="btn success">
          Okay
        </button>
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
      display: inline-block;
      width: 100%;
      font-size: 3.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 50px;
    }
  }
`;

export default Modal;
