import fetch from '../utils/fetch';

export const getSidebarDate = () => fetch('/sidebar/getSidebarData', {}, 'GET');
export const removeSidebarDate = (title) => fetch('/sidebar/removeSidebarData', {title}, 'POST');
export const addSidebarDate = (newSidebarData) => fetch('/sidebar/addSidebarData', {newSidebarData}, 'POST');
export const updateSidebarData = (updateData) => fetch('/sidebar/updateSidebarData', {updateData}, 'POST');
