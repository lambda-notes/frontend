import { createGlobalStyle } from 'styled-components';
import { Reset } from './Reset';
import { Global } from './Global';

export const GlobalStyles = createGlobalStyle`
  ${Reset}
  ${Global}
`;
