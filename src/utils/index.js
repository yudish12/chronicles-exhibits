import * as jwtFuncs from "./jwt";

const getActionSuccessResponse = (data) => {
  return {
    success: true,
    data: JSON.parse(JSON.stringify(data)),
  };
};

const getActionFailureResponse = (error, type) => {
  return {
    success: false,
    err: error?.message || error,
    type,
  };
};

export { jwtFuncs, getActionSuccessResponse, getActionFailureResponse };
