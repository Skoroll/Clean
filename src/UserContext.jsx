import React, { createContext, useState, useContext } from 'react';

// Créer le contexte utilisateur
export const UserContext = createContext();

// Fournisseur de contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Charger l'utilisateur depuis localStorage au démarrage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => useContext(UserContext);
