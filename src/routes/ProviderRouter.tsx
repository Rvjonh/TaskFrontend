import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from './layout';

import HomeRoute from './home';
import LoginRoute from './login';
import SignUpRoute from "./signup";
import PasswordResetRoute from "./passwordReset";
import PasswordResetConfirmationRoute from "./passwordResetConfirmation";
import PasswordChangeRoute from "./passwordChange";

import NoMatch from './noMatch'

export default function ProviderRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeRoute />} />

          <Route path="login" element={<LoginRoute />} />
          <Route path="signup" element={<SignUpRoute />} />
          <Route path="password-reset" element={<PasswordResetRoute />} />
          <Route path="password-change" element={<PasswordChangeRoute />} />
          <Route path="api/v1/password-reset/confirm/:id/:token/" element={<PasswordResetConfirmationRoute />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}