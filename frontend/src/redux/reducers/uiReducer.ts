// BAD: A separate UI reducer that partially overlaps with userReducer state
// (loading, error are tracked in both — no single source of truth)

const initialState: any = {
  sidebarOpen: false,
  modalOpen: false,
  modalType: null, // 'create' | 'edit' | 'delete' — but typed as any
  notification: null,
  // Dead fields — dark mode was a planned feature, never implemented
  darkMode: false,
  theme: 'default',
  // Dead field — from old layout that was replaced
  layoutType: 'grid',
};

export const uiReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, modalOpen: true, modalType: action.payload };

    case 'CLOSE_MODAL':
      return { ...state, modalOpen: false, modalType: null };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };

    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };

    // Dead cases — dark mode was never connected to UI
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};
