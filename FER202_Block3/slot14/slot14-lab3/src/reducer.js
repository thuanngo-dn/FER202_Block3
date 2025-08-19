// src/reducer.js
export const initialState = {
  search: "",              // ✅ luôn là chuỗi
  ageFilter: "all",
  hasAvatar: false,
  sortKey: "name-asc",
  selectedStudent: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_AGE_FILTER":
      return { ...state, ageFilter: action.payload };
    case "SET_HAS_AVATAR":
      return { ...state, hasAvatar: action.payload };
    case "SET_SORT_KEY":
      return { ...state, sortKey: action.payload };
    case "SET_SELECTED_STUDENT":
      return { ...state, selectedStudent: action.payload };
    default:
      return state;
  }
}
