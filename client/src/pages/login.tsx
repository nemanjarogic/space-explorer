import React from "react";
import { gql, useMutation } from "@apollo/client";

import { LoginForm, Loading } from "../components";
import * as LoginTypes from "./__generated__/login";
import { isLoggedInVar } from "../cache";

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        // Stores the user's unique ID and session token in localStorage,
        // so we can load these values into the in-memory cache the next
        // time the user visits our application
        localStorage.setItem("token", login.token as string);
        localStorage.setItem("userId", login.id as string);
        isLoggedInVar(true);
      }
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
