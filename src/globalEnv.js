import { Dashboard, Projects, WorkPlace, NewWorkPlace,  Tasks, Tasks2 } from './pages';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', component: Dashboard, current: true },
  { name: 'Projects', href: '/projects', component: Projects, current: false },
  { name: 'Work Place', href: '/workplace', component: NewWorkPlace, current: false },
  { name: 'Tasks', href: '/tasks', component: Tasks2, current: false },
];
