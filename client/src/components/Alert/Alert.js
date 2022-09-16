import { useContext, useEffect } from "react";
import MainContext from "../../context/MainContext";

const Alert = () => {
  const { alert, setAlert } = useContext(MainContext);

  useEffect(() => {
    if (alert.message === "") return;
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 5000);
  }, [alert]);

  return alert.message && <div className="">{alert.message}</div>;
};

export default Alert;
