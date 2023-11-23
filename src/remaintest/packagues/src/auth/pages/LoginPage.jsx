import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    login("Alexander Nova");

    navigate(lastPath, {
      replace: true,
    });
  };

  return (
    <div className="container mt-5">
      <div class="jumbotron">
        <h1 class="display-4">Heroes, App!</h1>
        <p class="lead">
          This is a simple hero unit, with information about simples heroes.
        </p>
        <hr class="my-4" />
        <p>It uses react, useReducer, Vite, Localstorage, Hooks And More</p>
        <p class="lead"> Enjoy with your heroes !</p>
        <button className="btn btn-primary" onClick={onLogin}>
          Click Here and Login
        </button>
      </div>
    </div>
  );
};
