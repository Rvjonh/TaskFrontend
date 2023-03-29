import { Link, Outlet } from 'react-router-dom'

import NavbarLink from './../../components/navbar'
import { TaskNavbar } from '../../components/tasksNavbar';

export function Layout() {
  return (
    <div>

      <NavbarLink />

      <TaskNavbar />

      <Outlet />

    </div>
  );
}