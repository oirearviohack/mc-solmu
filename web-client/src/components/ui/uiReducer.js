const TOGGLE_NAVIGATION = 'app/ui/TOGGLE_NAVIGATION'

const initialState = {
  isNavigationOpen: false
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION: {
      return {
        ...state,
        isNavigationOpen: !state.isNavigationOpen
      }
    }
    default: {
      return state
    }
  }
}

export const toggleNavigation = () => ({
  type: TOGGLE_NAVIGATION
})