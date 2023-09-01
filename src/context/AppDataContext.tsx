import React, { useReducer } from 'react';

type AppDataProviderProps = {
  children: React.ReactNode;
};

type AppDataState = {
  isLoading: boolean;
  isError: boolean;
  data: any; // 또는 구체적인 데이터 타입
  displayComponent: string | null;
};

const initialState: AppDataState = {
  isLoading: false,
  isError: false,
  data: null,
  displayComponent: 'characters',
};

// 유니온 타입을 이용하여 action의 타입을 정의.
type AppDataAction =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_ERROR' }
  | { type: 'SET_DISPLAY'; component: string };

// 제네릭 부분은 해당 컨텍스트에 저장될 데이터의 형태를 정의.
// 다시 말해, 해당 컨텍스트의 값으로 올 수 있는 것의 타입을 제한.
const AppDataContext = React.createContext<
  | {
      state: AppDataState;
      dispatch: React.Dispatch<AppDataAction>;
    }
  | undefined
>(undefined);

// appDataReducer에서 매개변수의 타입과 appDataReducer의 반환값의 타입을 정의한다.
const appDataReducer = (
  state: AppDataState,
  action: AppDataAction,
): AppDataState => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, isError: true };
    case 'SET_DISPLAY':
      return { ...state, displayComponent: action.component };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

// React.FC는 자동으로 children prop을 포함하므로, 별도의 prop 타입을 정의할 필요가 없다.
// 그런데 AppDataProvider에 추가적인 props를 전달하려고 할 때 문제가 발생할 수 있으므로 props의 타입을 명시적으로 정의해주어야 한다.
export const AppDataProvider: React.FC<AppDataProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  return (
    <AppDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContext, initialState };
