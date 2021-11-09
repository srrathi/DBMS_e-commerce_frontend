export const SET_PREVIOUS_TRANSACTIONS = (transcDataArray) => {
  return {
    type: "SET_PREVIOUS_TRANSACTIONS",
    payload: {
      data: transcDataArray,
    },
  };
};
