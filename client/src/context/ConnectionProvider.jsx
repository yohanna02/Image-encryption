import { createContext, useContext } from "react";
import { useState } from "react";

const ConnectionContext = createContext();

export function useConnection() {
    return useContext(ConnectionContext);
}

export function ConnectionProvider({ children }) {
    const [connected, setConnected] = useState();

    return (
        <ConnectionContext.Provider value={{ connected, setConnected }}>
            { children }
        </ConnectionContext.Provider>
    )
}