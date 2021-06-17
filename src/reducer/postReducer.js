export default function postReducer(state = [], action) {
  if (action.type === "fetch") {
    return action.data;
  }
  return state;
}
