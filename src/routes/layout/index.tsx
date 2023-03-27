import { Link, Outlet } from 'react-router-dom'

import NavbarLink from './../../components/navbar'
import { Account } from './../../components/UserAccount'

export function Layout() {
  return (
    <div>

      <NavbarLink />

      <Account />

      <Outlet />

    </div>
  );
}