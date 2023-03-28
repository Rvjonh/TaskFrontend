import { Link, Outlet } from 'react-router-dom'

import NavbarLink from './../../components/navbar'

export function Layout() {
  return (
    <div>

      <NavbarLink />

      <Outlet />

    </div>
  );
}