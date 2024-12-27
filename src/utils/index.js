import * as jwtFuncs from "./jwt";

const getActionSuccessResponse = (data, count) => {
  return {
    success: true,
    data: JSON.parse(JSON.stringify(data)),
    count: count ?? "not-requested",
  };
};

const getActionFailureResponse = (error, type) => {
  return {
    success: false,
    err: error?.message || error,
    type,
  };
};
const convertHumanReadableText = (text) =>
  text
    .split("_")
    .map((e) => e[0].toUpperCase() + e.slice(1))
    .join(" ");

export {
  jwtFuncs,
  convertHumanReadableText,
  getActionSuccessResponse,
  getActionFailureResponse,
};
