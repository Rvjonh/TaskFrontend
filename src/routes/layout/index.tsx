import { Outlet } from 'react-router-dom'

import NavbarLink from './../../components/navbar'
import { TaskNavbar } from '../../components/tasksNavbar';

import { useIsLogged } from '../../hooks/userIsLogged';

import AnimatedFooter from '../../components/animatedFooter';

export function Layout() {
  const userActive = useIsLogged()

  return (
    <div className='min-h-screen flex flex-col relative'>

      <NavbarLink />

      {userActive.active &&
        <TaskNavbar />
      }

      <Outlet />

      <AnimatedFooter />
    </div>
  );
}