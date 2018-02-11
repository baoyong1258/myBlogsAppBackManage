import fetch from '../utils/fetch';

export const getSidebarDate = () => fetch('/sidebar/getSidebarData', {}, 'GET');
export const removeSidebarDate = (title) => fetch('/sidebar/removeSidebarData', {title}, 'POST');
