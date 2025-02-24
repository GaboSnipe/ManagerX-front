import { Dashboard, Projects, WorkPlace, NewWorkPlace,  Tasks, Tasks2 } from './pages';

export const navigation = [
  { name: 'მთავარი', href: '/dashboard', component: Dashboard, current: true },
  { name: 'არააკრედიტირებული ქეისები', href: '/projects', component: Projects, current: false },
  { name: 'სამუშაო გარემო', href: '/workplace', component: NewWorkPlace, current: false },
  { name: 'დავალებები', href: '/tasks', component: Tasks2, current: false },
];
