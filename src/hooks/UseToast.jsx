import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./UseToast.css";
const UseToast = () => {
  const showErrorToast = (text) => {
    toast.error(<div>{text}</div>, {
      className: "toastError",
      closeOnClick: true,
      icon: <ErrorOutlineIcon />,
    });
  };
  const showSuccessToast = (text) => {
    toast.success(<div>{text}</div>, {
      className: "toastSuccess",
      closeOnClick: true,
      icon: <CheckCircleOutlineIcon />,
    });
  };
  const showWarningToast = (text) => {
    toast.warning(<div>{text}</div>, {
      className: "toastWarning",
      closeOnClick: true,
      icon: <WarningAmberIcon />,
    });
  };
  return { showErrorToast, showSuccessToast, showWarningToast };
};

export default UseToast;
