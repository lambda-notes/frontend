import { createGlobalStyle } from 'styled-components';
import { Reset } from './Reset';
import { Global } from './Global';
import { Buttons } from './Buttons';

export const GlobalStyles = createGlobalStyle`
  ${Reset}
  ${Global}
  ${Buttons}
`;
