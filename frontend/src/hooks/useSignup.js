import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

export default () => {
  const [isLoading, setIsLoading] = useState(null);
  const { setToken, setUser } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);

  const signup = async (name, username, email, password) => {
    setIsLoading(true);

    const response = await fetch(`https://acebook-backend.onrender.com/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      pushModal({
        message: "Account created!",
        type: "success",
      });
    } else {
      pushModal({
        message: data.message,
        type: "error",
      });
    }

    setIsLoading(false);
  };

  return { signup, isLoading };
};
