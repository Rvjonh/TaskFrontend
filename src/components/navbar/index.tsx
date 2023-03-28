import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { logoutUser } from './../../store/loginSlice';

import TasksBackend from './../../services/tasksBackend';

export default function NavbarLink() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      TasksBackend.logoutSession()
        .then(res => {
          dispatch(logoutUser())
        })
      dispatch(logoutUser())
    } catch (error) {
      dispatch(logoutUser())
    }
  }


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
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </nav>
  );
}