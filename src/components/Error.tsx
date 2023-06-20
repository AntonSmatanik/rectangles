import React from "react";
import { useNavigate } from "react-router-dom";
import { TErrorData } from "../types";
import { defaultQueryParamValues } from "../data";

const Error = ({ message, code }: TErrorData) => {
  const navigate = useNavigate();

  const goToRouteWithParams = () =>
    navigate({
      pathname: "/",
      search: defaultQueryParamValues,
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
