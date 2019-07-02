import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { url } from '../Auth/config';

const Options = () => {
  const [state, dispatch] = useStateValue(globalContext);

  const { lessons } = state;

  console.log(lessons);

  useEffect(() => {
    axios
      .get(`${url}/lessons`)
      .then(res => {
        dispatch({ type: 'GET_LESSONS', payload: res.data.lessons });
      })
      .catch(err => dispatch({ type: 'GET_LESSONS_FAIL', payload: err }));
  }, [dispatch]);

  return (
    <Styles>
      <h2>Full Stack Web Development Core</h2>
    </Styles>
  );
};

export default Options;

const Styles = styled.div`
  h2 {
    padding: 0.4rem 2.4rem;
  }
`;
