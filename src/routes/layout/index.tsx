import { Outlet } from 'react-router-dom'

import NavbarLink from './../../components/navbar'
import { TaskNavbar } from '../../components/tasksNavbar';

import { useIsLogged } from '../../hooks/userIsLogged';

export function Layout() {
  const userActive = useIsLogged()

  return (
    <div>

      <NavbarLink />

      {userActive.active &&
        <TaskNavbar />
      }

      <Outlet />

    </div>
  );
}