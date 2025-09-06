import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  width: "90%",
  backgroundColor: "#00674f",
  color: "#fff",
  borderRadius: "8px",
  padding: "10px 20px",
  fontFamily: "dana-fanum",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#00674f",
  },
  "&:disabled": {
    backgroundColor: "#ddd",
    color: "#aaa",
  },
  animation: "fadeInUp 0.5s ease-in-out",
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export default function ActionButton({
  title,
  onClick,
  customStyles,
  disabled,
  className,
  btnLoading = false,
}) {
  return (
    <CustomButton
      onClick={onClick}
      className={className}
      style={customStyles}
      disabled={disabled}
    >
      {!btnLoading ? (
        title
      ) : (
        <div className="text-white h-full flex items-center">
          <CircularProgress color="inherit" size="30px" />
        </div>
      )}
    </CustomButton>
  );
}
