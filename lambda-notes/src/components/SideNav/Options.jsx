import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { url } from '../Auth/config';
import {
  GET_LESSONS,
  GET_LESSONS_FAIL,
  LESSON_CLICKED,
  SPRINT_CLICKED
} from '../../store/constants';

const Options = () => {
  const [state, dispatch] = useStateValue(globalContext);

  const { sprints, lessons, selectedSprint, selectedLesson } = state;

  useEffect(() => {
    axios
      .get(`${url}/sprints/cohort/1`)
      .then(res => {
        dispatch({
          type: GET_LESSONS,
          payload: res.data
        });
      })
      .catch(err => dispatch({ type: GET_LESSONS_FAIL, payload: err }));
  }, []);

  // combine sprints and lessons into main menu
  const lessonList = [];
  sprints.forEach(sprint => {
    const lessonsArr = lessons.filter(lesson => lesson.sprintID === sprint.id);
    lessonList.push({
      sprintTitle: sprint.sprintTitle,
      id: sprint.id,
      lessonsArr
    });
  });

  const setLessonId = (e, id) => {
    e.preventDefault();
    dispatch({ type: LESSON_CLICKED, payload: id });
  };

  const setSprintId = (e, id) => {
    e.preventDefault();
    if (selectedSprint === id) {
      dispatch({ type: SPRINT_CLICKED, payload: null });
    } else {
      dispatch({ type: SPRINT_CLICKED, payload: id });
    }
  };

  console.log(selectedSprint);

  return (
    <Styles>
      <h2>Full Stack Web Development Core</h2>
      {lessonList.map(sprint => {
        return (
          <>
            <h3
              key={sprint.id}
              onClick={e => setSprintId(e, sprint.id)}
              className={selectedSprint === sprint.id && 'selected'}
            >
              {sprint.id}. {sprint.sprintTitle}
            </h3>
            {sprint.lessonsArr.map(lesson => {
              return (
                <div className={selectedSprint === sprint.id ? 'show' : 'hide'}>
                  <h4
                    key={lesson.id}
                    onClick={e => setLessonId(e, lesson.id)}
                    className={selectedLesson === lesson.id && 'selected'}
                  >
                    {lesson.lessonList}
                  </h4>
                </div>
              );
            })}
          </>
        );
      })}
    </Styles>
  );
};

export default Options;

const Styles = styled.div`
  line-height: 1.5;

  h2 {
    padding: 0.4rem 2.4rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 16px;
    padding: 0.4rem 8rem 0.4rem 2.4rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: #2f2c4b;
    }
  }

  h4 {
    font-size: 14px;
    padding: 0.4rem 0 0.4rem 3.7rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: #2f2c4b;
    }
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  .selected {
    background: #2f2c4b;
  }
`;
