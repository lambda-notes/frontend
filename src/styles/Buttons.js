import { css } from 'styled-components';

export const Buttons = css`
  .btn {
    min-width: 110px;
    display: inline-block;
    margin: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    :hover {
      color: #fff;
      background-color: #286090;
      border-color: #204d74;
    }
  }
  .danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
    :hover {
      color: #fff;
      background-color: #c9302c;
      border-color: #ac2925;
    }
  }
  .success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    :hover {
      color: #fff;
      background-color: #449d44;
      border-color: #398439;
    }
  }
  .input {
    display: block;
    max-width: 200px;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .select {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;
