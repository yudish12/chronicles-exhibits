import * as jwtFuncs from "./jwt";

const getActionSuccessResponse = (data) => {
  return {
    data,
    success: true,
  };
};

const getActionFailureResponse = (err, field) => {
  return {
    err,
    field,
    success: false,
  };
};

export { jwtFuncs, getActionSuccessResponse, getActionFailureResponse };
