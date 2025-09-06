"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import TextFieldInput from "@/components/TextFieldInput";
import Button from "@/components/BottomButton";
import { useRouter } from "next/navigation";
import { InitialSignUp } from "../../../APIGate/Merchant";
import UseToast from "@/hooks/UseToast";
import RequestNotificationPermission from "@/components/requestNotificationPermission";
import { FiPhone } from "react-icons/fi";

const { showErrorToast, showSuccessToast, showWarningToast } = UseToast();

export default function Registration() {
  const router = useRouter();

  const fixNumbers = (str) => {
    return str.replace(/[۰-۹]/g, (w) => "۰۱۲۳۴۵۶۷۸۹".indexOf(w));
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumValid, setIsPhoneNumValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [createNotificationAuth, setCreateNotificationAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const fixedValue = fixNumbers(value);
    setPhoneNumber(fixedValue); 
    if (isTouched) {
      phoneValidation(fixedValue);
    }
  };
  
  const handleBlur = () => {
    setIsTouched(true);
    phoneValidation(phoneNumber);
  };
  
  const phoneValidation = (value) => {
    // Strict 09xxxxxxxxx format (11 digits)
    const isValid = /^09\d{9}$/.test(value);
    setIsPhoneNumValid(isValid);
    return isValid;
  };
  

  // const handlePhoneNumberChange = (event) => {
  //   const value = event.target.value;
  //   phoneValidation(value);
  // };

  const [appVer, setAppVer] = useState("");

  useEffect(() => {
    fetch("/appsettings.json")
      .then((res) => res.json())
      .then((data) => {
        setAppVer(data.appVersion);
      })
      .catch((err) => {
        console.error("Error fetching app version:", err);
      });
  }, []);

   // useEffect(() => {
  //   if (appVer) {
  //     const storedVersion = localStorage.getItem("viraNexAppVersion");

  //     if (!storedVersion) {
  //       localStorage.setItem("viraNexAppVersion", appVer);
  //     } else if (storedVersion != appVer) {
  //       localStorage.setItem("viraNexAppVersion", appVer);
  //       window.location.reload();
  //     }
  //   }
  // }, [appVer]);

  // const handleBlur = () => {
  //   setIsTouched(true);
  //   if (phoneNumber === "") {
  //     setIsPhoneNumValid(false);
  //   }
  // };
  
  const getInitialSignUp = async () => {
    setCreateNotificationAuth(true);
    setBtnLoading(true);
    let isSubmited = await InitialSignUp(phoneNumber, null, null);
    if (isSubmited.status === 200) {
      if (isSubmited.data.responseCode === 200) {
        localStorage.setItem("UserViraNexMobile", phoneNumber),
          router.push("/confirm");
      } else {
        showErrorToast(isSubmited.data.message);
      }
    } else {
      showErrorToast("خطای داخلی پیش آمده است.");
    }
    setBtnLoading(false);
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
        (registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        },
        (error) => {
          console.error('Service Worker registration failed:', error);
        }
      );
    }
  }, []);


  return (
    <>
    {
      createNotificationAuth &&  <RequestNotificationPermission />
    }
     
      <main className="flex h-[85vh] flex-col items-center gap-2 justify-center p-6">
        {/* <div className="w-30 h-auto">
          <Image
          src="/img/png/darkLogo.png"
            alt="Logo"
            width={150}
            height={47}
            priority
          />
        </div> */}

        <div className="w-67 h-auto">
          <Image
            src="/img/png/registration.png"
            alt="registraionimg"
            width={200}
            height={200}
            priority
          />
        </div>
        <div className="w-full mb-4 mt-8 text-right text-lg text-custom-purple">
          ثبت نام 
        </div>
      
        <TextFieldInput
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onBlur={handleBlur}
          placeholder="شماره تلفن همراه"
          isError={!isPhoneNumValid && isTouched}
          errorMessage="شماره تلفن وارد شده نا معتبر است"
          maxLength={11}
          type={"tel"}
        />
        <div className="w-full text-right mb-5 text-custom-purple text-[10px] flex items-center gap-1">
                      
         
          شماره خود را با صفر اول (...09) وارد نمایید{" "}
        </div>
      </main>
      <div className="h-[15vh] w-full flex justify-center">
        <Button
          title="ادامه"
          onClick={getInitialSignUp}

          disabled={!isPhoneNumValid || (isPhoneNumValid && !phoneNumber)}
          btnLoading={btnLoading}
        />
      </div>
    </>
  );
}
