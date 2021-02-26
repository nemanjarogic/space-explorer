import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/client";

import { menuItemClassName } from "../components/menu-item";
import { isLoggedInVar } from "../cache";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={() => {
        // Evict and garbage-collect the cached user object
        client.cache.evict({ fieldName: "me" });
        client.cache.gc();

        // Remove user details from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        // Set the logged-in status to false
        // When the reactive variable's value changes, that change is automatically broadcast
        // to every query that depends on the variable's value (IS_LOGGED_IN query).
        // Because of this, when a user clicks the logout button, our isLoggedIn component
        // updates to display the login screen.
        isLoggedInVar(false);
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

export default LogoutButton;

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0,
});
