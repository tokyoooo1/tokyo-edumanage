export const initialState = {
  auth: {
    user: null,
    isAuthenticated: false,
  },
  students: {
    records: [],
    selectedStudentId: null,
  },
  attendance: {
    today: [],
    summary: {
      present: 428,
      absent: 18,
      late: 11,
      excused: 6,
    },
  },
  academics: {
    activeTerm: "2026 Term 2",
    gradingScale: "Percentage",
  },
  fees: {
    outstanding: 1845000,
    collected: 7620000,
  },
  teachers: {
    records: [],
  },
  communication: {
    unread: 12,
  },
};

export function rootReducer(state, action) {
  switch (action.type) {
    case "auth/login":
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: true,
        },
      };

    case "auth/logout":
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false,
        },
      };

    case "students/setAll":
      return {
        ...state,
        students: {
          ...state.students,
          records: action.payload,
        },
      };

    case "students/select":
      return {
        ...state,
        students: {
          ...state.students,
          selectedStudentId: action.payload,
        },
      };

    case "attendance/setToday":
      return {
        ...state,
        attendance: {
          ...state.attendance,
          today: action.payload,
        },
      };

    case "teachers/setAll":
      return {
        ...state,
        teachers: {
          ...state.teachers,
          records: action.payload,
        },
      };

    default:
      return state;
  }
}
