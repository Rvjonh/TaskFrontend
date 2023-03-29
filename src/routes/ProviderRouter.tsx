import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from './layout';

import HomeRoute from './home';
import LoginRoute from './login';
import SignUpRoute from "./signup";
import PasswordResetRoute from "./passwordReset";
import PasswordResetConfirmationRoute from "./passwordResetConfirmation";
import PasswordChangeRoute from "./passwordChange";

import TaskRoute from "./tasks";
import TaskDetailRoute from './taskDetail';
import TaskHistoryRoute from './taskHistory'

import NoMatch from './noMatch'

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ProviderRouter() {
  const { identificador } = useSelector((state: RootState) => state.login);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeRoute />} />


          <Route path="login" element={<LoginRoute />} />
          <Route path="signup" element={<SignUpRoute />} />
          <Route path="password-change" element={<PasswordChangeRoute />} />

          <Route path="password-reset" element={<PasswordResetRoute />} />
          <Route path="api/v1/password-reset/confirm/:id/:token/" element={<PasswordResetConfirmationRoute />} />

          {/* available when user is logged */}
          {identificador && <>
            <Route path="task" element={<TaskRoute />} />
            <Route path="task/:id/" element={<TaskDetailRoute />} />
            <Route path="task/:id/update/" element={<TaskRoute />} />

            <Route path="task/history/" element={<TaskHistoryRoute />} />
          </>}


          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}