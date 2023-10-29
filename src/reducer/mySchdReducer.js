export const initialState = {
    ttl: '',
    sttgDt: '',
    fnshDt:'',
    sttgTktm:'',
    fnshTktm:'',
  };
export const mySchdReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          [action.name]: action.value,
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };
