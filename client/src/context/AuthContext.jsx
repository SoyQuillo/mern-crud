import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);

      // Verificar que el registro fue exitoso
      if (res.status === 200) {
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log(e.response);

      const errorData = e.response.data;

      // Si es un array directamente (errores personalizados del backend)
      if (Array.isArray(errorData)) {
        setErrors(errorData);
      }
      // Si es un objeto (errores de validación de Zod)
      else if (typeof errorData === "object") {
        const errorMessages = [];

        // Recorrer todas las propiedades del objeto de error
        Object.keys(errorData).forEach((key) => {
          if (key !== "_errors" && errorData[key]._errors) {
            errorMessages.push(...errorData[key]._errors);
          }
        });

        // También agregar errores generales si existen
        if (errorData._errors && errorData._errors.length > 0) {
          errorMessages.push(...errorData._errors);
        }

        setErrors(errorMessages);
      }
      // Fallback por si es un string u otro tipo
      else {
        setErrors([errorData]);
      }
    }
  };

  const signin = async (user) => {
  try {
    const res = await loginRequest(user);
    
    // Verificar que el login fue exitoso
    if (res.status === 200) {
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    }
  } catch (e) {
    console.log('Error response:', e.response);
    console.log('Error data:', e.response.data);
    
    const errorData = e.response.data;

    // Si es un array directamente (errores personalizados del backend)
    if (Array.isArray(errorData)) {
      setErrors(errorData);
    }
    // Si es un objeto (errores de validación de Zod)
    else if (typeof errorData === "object") {
      const errorMessages = [];

      // Recorrer todas las propiedades del objeto de error
      Object.keys(errorData).forEach((key) => {
        if (key !== "_errors" && errorData[key]._errors) {
          errorMessages.push(...errorData[key]._errors);
        }
      });

      // También agregar errores generales si existen
      if (errorData._errors && errorData._errors.length > 0) {
        errorMessages.push(...errorData._errors);
      }

      setErrors(errorMessages);
    }
    // Fallback por si es un string u otro tipo
    else {
      setErrors([String(errorData)]);
    }
  }
};





  return (
    <AuthContext.Provider value={{ signup, signin, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
