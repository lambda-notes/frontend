import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { url } from '../Auth/config';

const Admin = () => {
  const [state, setState] = useState({
    lessons: [],
    cohorts: [],
    filtered: []
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let res = await axios.get(`${url}/lessons`);
      // console.log(res.data.lessons);

      let res2 = await axios.get(`${url}/cohorts`);
      // console.log(res.data.cohorts);

      setState({ lessons: res.data.lessons, cohorts: res2.data.cohorts });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = e => {
    console.log(e.target.value);
    const id = e.target.value;
    let item = state.lessons.findIndex(item => item.lessonsCohortID == id);
    console.log(item);
    setState({ ...state, filtered: state.lessons[item] });
  };
  console.log(state.filtered ? state.filtered.lessonList : null);
  return (
    <Styles>
      <h1>Admin</h1>
      {state.cohorts ? (
        <form>
          <select name="cohort" onChange={handleFilter}>
            <option value={null}>Select Cohort</option>
            {state.cohorts.map(item => {
              return (
                <option key={item.id} value={item.id}>
                  {item.cohortName}
                </option>
              );
            })}
          </select>
        </form>
      ) : (
        <p>Loading</p>
      )}
    </Styles>
  );
};

export default Admin;

const Styles = styled.div`
  padding: 10px;
  font-size: 1.4rem;
`;
