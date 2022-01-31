import Parse from "parse/dist/parse.min.js";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Autheticator(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async function () {
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        navigate("/login");
      }
    };
    getCurrentUser();
  }, []);

  return <>{props.children}</>;
}
