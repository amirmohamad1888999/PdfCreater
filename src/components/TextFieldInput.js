import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";

// Define a styled Box component for RTL layout
const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row-reverse", // RTL layout
  alignItems: "center",
  width: "100%",
}));

// Define a styled TextField component with custom styles
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& legend": {
    display: "none",
  },
  "& .MuiFormHelperText-root": {
    textAlign: "right",
    fontFamily: "dana-fanum",
  },
  "& .MuiInputLabel-root": {
    width: "100px", // Adjust the width of the label
    top: "-12px",
    textAlign: "center",
    right: 10, // Align label to the right for RTL
    transform: "none",
    position: "absolute",
    padding: "0 4px",
    backgroundColor: "white",
    color: "#582768",
    fontFamily: "dana-fanum",
    fontSize: "12px",
    "&.Mui-focused": {
      color: "#582768", // Change color to green when focused
    },
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "dana-fanum",
    borderRadius: "8px", // Border radius for the input
    height: "47px", // Set height for the input
    "& fieldset": {
      borderColor: "#582768", // Set border color to purple
    },
    "&:hover fieldset": {
      borderColor: "#582768", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#582768", // Border color when focused
    },
  },
}));

export default function TextFieldInput({
  value,
  onChange,
  onBlur,
  placeholder,
  customStyles,
  isError,
  errorMessage,
  maxLength,
  type,
}) {
  // Function to allow only numeric values
  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only numbers (48-57 is the keycode for 0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  return (
    <Container dir="rtl" style={customStyles}>
      <CustomTextField
        label={placeholder}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={isError}
        helperText={isError ? errorMessage : ""}
        inputProps={{
          maxLength: maxLength,
          // type: "tel",
          // inputMode: "numeric", 
          // onKeyPress: handleKeyPress, 
          // style: {
          //   fontFamily: "'dana-fanum', sans-serif", 
          // },
        }}
        InputProps={{
          type: type,
          endAdornment: (
            <InputAdornment position="end">
              <div className="w-4 h-auto ml-1.5">
              <FiPhone color="#582768de" size={20}/>
              </div>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

