const addAlert = (text, style) => {
  return {
    type: "ADD_ALERT",
    text,
    style,
  };
};

const removeAlert = (id) => {
  return {
    type: "REMOVE_ALERT",
    id,
  };
};

export { addAlert, removeAlert };
