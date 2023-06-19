import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Board from "./Board";
import Error from "./Error";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Board />}></Route>
        <Route
          path="*"
          element={<Error code={404} message="Not found" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
