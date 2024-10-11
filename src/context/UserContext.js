import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const UserContext = createContext();

// Hook customizado para acessar o contexto mais facilmente
export const useUser = () => {
    return useContext(UserContext);
};

// Provedor do contexto que será usado para encapsular os componentes da aplicação
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Estado para armazenar o usuário

    const login = (userData) => {
        setUser(userData);  // Função para definir as informações do usuário
    };

    const logout = () => {
        setUser(null);  // Função para limpar as informações do usuário (logout)
    };

    // Provedor que encapsula os filhos e provê o contexto para eles
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
