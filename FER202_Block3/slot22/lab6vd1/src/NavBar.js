import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <>
          <span>Please login</span>
          <button
            onClick={() =>
              dispatch(login({ name: "Nguyen Van A", email: "a@gmail.com" }))
            }
          >
            Login
          </button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
