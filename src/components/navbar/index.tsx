import { Link } from 'react-router-dom'

export default function NavbarLink() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/password-reset">Password Reset</Link>
        </li>
      </ul>
    </nav>
  );
}