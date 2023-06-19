import React from "react";
import { useNavigate } from "react-router-dom";
import { TErrorData } from "../types";

const Error = ({ message, code }: TErrorData) => {
  const navigate = useNavigate();

  const goToRouteWithParams = () =>
    navigate({
      pathname: "/",
      search: "?sizes=[100,46,21,60,24]",
    });

  return (
    <div className="error">
      {code && <h2>{code}</h2>}
      <p>{message}</p>
      <button onClick={() => goToRouteWithParams()}>
        Navigate to homepage with working data
      </button>
    </div>
  );
};

export default Error;
