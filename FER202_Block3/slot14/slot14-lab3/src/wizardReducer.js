export const wizardInitialState = {
  step: 0,
  about: {
    name: "",
    email: "",
    age: "",
    avatar: "",
  },
  account: {
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
  },
  address: {
    country: "",
    city: "",
    street: "",
  },
};

export function wizardReducer(state, action) {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value,
        },
      };
    case "RESET":
      return wizardInitialState;
    default:
      return state;
  }
}
