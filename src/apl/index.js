import fetch from '../utils/fetch';

export const getSidebarDate = () => fetch('/sidebar/getSidebarData', {}, 'GET');
