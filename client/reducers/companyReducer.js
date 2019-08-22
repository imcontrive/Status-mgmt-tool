const initState = {
  companies: []
}

export default function companyReducer(state=initState, action) {
  switch (action.type) {
    case 'GET_COMPANY_LIST_SUCCESS': {
      return {
        ...state,
        companies: action.companies
      }
    }
        
    default:
      return state;
  }
}