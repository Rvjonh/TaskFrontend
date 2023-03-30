import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'

import NavbarLink from './../../components/navbar'
import { TaskNavbar } from '../../components/tasksNavbar';

import { useIsLogged } from '../../hooks/userIsLogged';

import AnimatedFooter from '../../components/animatedFooter';

export function Layout() {
  const location = useLocation();
  const userActive = useIsLogged();

  useEffect(() => {
    if (document.title === "Page No Found") {
      document.title = "Task App";
    }
  }, [location]);

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