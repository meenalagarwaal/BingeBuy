import React, { createContext, useState, useContext } from "react";

const ThemeContext= createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const themeStyle ={
      backgroundColor: isDarkTheme ? "#000000" : "#ffffff",
      color: isDarkTheme ? "#ffffff" : "#000000"
    }

    const toggleTheme = () => {
      setIsDarkTheme((prevTheme) => !prevTheme);
      
    }
    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
           <div style={themeStyle}>{children}</div>
        </ThemeContext.Provider>
      );
    }

    export const useTheme = () => {
      const context = useContext(ThemeContext);
      if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
      }
      return context;
    };

