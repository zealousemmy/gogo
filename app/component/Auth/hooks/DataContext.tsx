'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type keys = 'USER_DATA' | 'WALLET_DATA' ;

// Define the structure for your state and actions
interface IPayload {
    key: keys;
    value: object | any;
}

interface Action {
    type: 'SET_DATA';
    payload: IPayload;
}

type State = Record<keys, any>;

type Dispatch = (action: Action) => void;

interface GenericContextType {
    state: State;
    dispatch: Dispatch;
}

// Create a generic context
const DataContext = createContext<GenericContextType | undefined>(undefined);

// Define a reducer function
function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, [action.payload.key]: action.payload.value };
        // Add more cases for different actions if needed
        default:
            return state;
    }
}

// Define a context provider component
interface GenericContextProviderProps {
    children: ReactNode;
}

    export const DataProvider: React.FC<GenericContextProviderProps> = ({ children }) => {
    const initialState = {} as State;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

// Create a custom hook to access the context
export const useData = (): { state: State; updateData: Dispatch } => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return { state: context.state, updateData: context.dispatch };
};
