import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

export default (finished) => {
  const [isLoading, setIsLoading] = useState(null);
  const { token, setToken, setUser } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);

  const update = async (body) => {
    setIsLoading(true);

    const response = await fetch(`https://acebook-backend.onrender.com/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      pushModal({
        message: "Information updated!",
        type: "success",
      });
    } else {
      pushModal({
        message: data.message,
        type: "error",
      });
    }

    setIsLoading(false);
    finished();
  };

  return { update, isLoading };
};
