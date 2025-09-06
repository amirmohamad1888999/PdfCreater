"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import CheckItem from "@/components/CheckItem";
import CheckItemWithImages from "@/components/checkGenders";
import { CheckToken, RefreshToken } from "../../../APIGate/Merchant";
import { ProductGroup } from "../../../APIGate/ProductGroup";
import { DropDown } from "../../../APIGate/ProductUnit";
import { GetAll } from "../../../APIGate/Occasion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UseToast from "@/hooks/UseToast";

const genders = [
  {
    id: 1,
    label: "آقا",
    activeImage: "/img/png/gender/GREENyoung-businessman-icon.png",
    inactiveImage: "/img/png/gender/GRAYyoung-businessman-icon.png",
  },
  {
    id: 2,
    label: "خانم",
    activeImage: "/img/png/gender/GREENbusinesswoman-icon.png",
    inactiveImage: "/img/png/gender/GRAY-businesswoman-icon.png",
  },
];
function Filter({ closeModal, setSelectedFilter, selectedFilter }) {
  const router = useRouter();
  const [flowerTypes, setFlowerTypes] = useState("");
  const [flowerShapes, setFlowerShapes] = useState("");
  const [occasions, setOccasions] = useState("");
  const [occasionsLoading, setOccasionsLoading] = useState(false);
  const [flowerTypesLoading, setFlowerTypesLoading] = useState(false);
  const [flowerShapesLoading, setFlowerShapesLoading] = useState(false);
  const { showErrorToast, showSuccessToast, showWarningToast } = UseToast();

  const formatInputValue = (value) => {
    const englishNum = convertFarsiToEnglish(value);
    const numericValue = englishNum.replace(/\D/g, "");
    const formattedValue = Number(numericValue).toLocaleString("en-US");
    return formattedValue;
  };

  const convertFarsiToEnglish = (num) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < farsiDigits.length; i++) {
      num = num.replace(new RegExp(farsiDigits[i], "g"), englishDigits[i]);
    }

    return num;
  };
  // const [formData, setFormData] = useState({
  //   // productName: selectedFilter && selectedFilter.productName ? selectedFilter.productName:"",
  //   priceFrom:
  //     selectedFilter && selectedFilter.priceFrom
  //       ? selectedFilter.priceFrom
  //       : "",
  //   priceTo:
  //     selectedFilter && selectedFilter.priceTo ? selectedFilter.priceTo : "",
  //   flowerType:
  //     selectedFilter && selectedFilter.flowerType.length > 0
  //       ? selectedFilter.flowerType
  //       : [],
  //   flowerShape:
  //     selectedFilter && selectedFilter.flowerShape.length > 0
  //       ? selectedFilter.flowerShape
  //       : [],
  //   occasion:
  //     selectedFilter && selectedFilter.occasion.length > 0
  //       ? selectedFilter.occasion
  //       : [],
  //   suitableFor:
  //     selectedFilter && selectedFilter.suitableFor.length > 0
  //       ? selectedFilter.suitableFor
  //       : [],
  // });
  const [formDataError, setFormDataError] = useState({});
  useEffect(() => {
    // getCheckToken();
  }, []);
  const handleInputChange = (name, event) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: event,
    }));
  };
  const deleteInputHandler = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: "",
    }));
    setFormDataError((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };
  const deleteFilter = () => {
    const emptyObject = {
      // productName: "",
      priceFrom: "",
      priceFrom: "",
      flowerType: [],
      flowerShape: [],
      occasion: [],
      suitableFor: [],
    };
    setSelectedFilter(emptyObject);
  };
  // const formatInputValue = (value) => {
  //   const englishNum = convertFarsiToEnglish(value);
  //   const numericValue = englishNum.replace(/\D/g, "");
  //   // Use regex for formatting instead of Number conversion
  //   const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return formattedValue;
  // };
  // const convertFarsiToEnglish = (num) => {
  //   const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  //   const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  //   for (let i = 0; i < farsiDigits.length; i++) {
  //     num = num.replace(new RegExp(farsiDigits[i], "g"), englishDigits[i]);
  //   }

  //   return num;
  // };
  const getCheckToken = async () => {
    try {
      let isSubmited = await CheckToken();
      if (isSubmited.data == "You are offline") {
        showErrorToast("خطای شبکه پیش آمده است.");
        return;
      }
      if (isSubmited.status === 200) {
        if (isSubmited.data.responseCode === 200) {
          getUnit();
          handleProductGroup();
          getOccasion();
          // getIndicators();
        } else {
          showErrorToast(isSubmited.data.message);
        }
      } else if (isSubmited.response && isSubmited.response.status == 401) {
        if (!localStorage.getItem("refreshTokenViraNex")) {
          router.push("/registration");
        } else {
          let ref = await RefreshToken();
          if (ref.data.responseCode === 200) {
            localStorage.setItem(
              "refreshTokenViraNex",
              ref.data.value.response.refreshToken
            );
            localStorage.setItem("tokenViraNex", ref.data.value.response.token);
            getCheckToken();
          } else {
            router.push("/registration");
          }
        }
      } else {
        showErrorToast("خطای داخلی پیش آمده است.");
      }
    } catch (error) {
      showErrorToast("خطا اتفاق افتاده است");
    } finally {
    }
  };
  const getUnit = async () => {
    setFlowerTypesLoading(true);
    try {
      let isSubmited = await DropDown();
      if (isSubmited.status === 200) {
        if (isSubmited.data.responseCode === 200) {
          setFlowerTypes(isSubmited.data.value.response);
        } else {
          showErrorToast(isSubmited.data.message);
        }
      } else if (isSubmited.response && isSubmited.response.status == 401) {
        if (!localStorage.getItem("refreshTokenViraNex")) {
          router.push("/registration");
        } else {
          let ref = await RefreshToken();
          if (ref.data.responseCode === 200) {
            localStorage.setItem(
              "refreshTokenViraNex",
              ref.data.value.response.refreshToken
            );
            localStorage.setItem("tokenViraNex", ref.data.value.response.token);
            getUnit();
          } else {
            router.push("/registration");
          }
        }
      } else {
        showErrorToast("خطای داخلی پیش آمده است.");
      }
    } catch (error) {
      showErrorToast("خطا در دریافت اطلاعات اتفاق افتاده است");
    } finally {
      setFlowerTypesLoading(false);
    }
  };
  const getGroup = async (body) => {
    setFlowerShapesLoading(true);
    try {
      let isSubmited = await ProductGroup(body);
      if (isSubmited.status === 200) {
        if (isSubmited.data.responseCode === 200) {
          setFlowerShapes(isSubmited.data.value.response);
        } else {
          showErrorToast(isSubmited.data.message);
        }
      } else if (isSubmited.response && isSubmited.response.status == 401) {
        if (!localStorage.getItem("refreshTokenViraNex")) {
          router.push("/registration");
        } else {
          let ref = await RefreshToken();
          if (ref.data.responseCode === 200) {
            localStorage.setItem(
              "refreshTokenViraNex",
              ref.data.value.response.refreshToken
            );
            localStorage.setItem("tokenViraNex", ref.data.value.response.token);
            handleProductGroup(body);
          } else {
            router.push("/registration");
          }
        }
      } else {
        showErrorToast("خطای داخلی پیش آمده است.");
      }
    } catch (error) {
      showErrorToast("خطا در دریافت اطلاعات اتفاق افتاده است");
    } finally {
      setFlowerShapesLoading(false);
    }
  };
  const handleProductGroup = () => {
    const obj = {
      parentId: 0,
      title: null,
      isActive: true,
    };
    getGroup(obj);
  };

  const getOccasion = async () => {
    setOccasionsLoading(true);
    try {
      let isSubmited = await GetAll();
      if (isSubmited.status === 200) {
        if (isSubmited.data.responseCode === 200) {
          setOccasions(isSubmited.data.value.response);
        } else {
          showErrorToast(isSubmited.data.message);
        }
      } else if (isSubmited.response && isSubmited.response.status == 401) {
        if (!localStorage.getItem("refreshTokenViraNex")) {
          router.push("/registration");
        } else {
          let ref = await RefreshToken();
          if (ref.data.responseCode === 200) {
            localStorage.setItem(
              "refreshTokenViraNex",
              ref.data.value.response.refreshToken
            );
            localStorage.setItem("tokenViraNex", ref.data.value.response.token);
            getOccasion();
          } else {
            router.push("/registration");
          }
        }
      } else {
        showErrorToast("خطای داخلی پیش آمده است.");
      }
    } catch (error) {
      showErrorToast("خطا در دریافت اطلاعات اتفاق افتاده است");
    } finally {
      setOccasionsLoading(false);
    }
  };

  const mockPosData = {
    communicationMethods: [
      { id: 1, title: "بلوتوث" },
      { id: 2, title: "USB" },
      { id: 3, title: "Wi-Fi" },
      { id: 4, title: "GPRS" },
      { id: 5, title: "Ethernet" },
    ],

    ramOptions: [
      { value: "2GB", label: "2 گیگابایت" },
      { value: "4GB", label: "4 گیگابایت" },
      { value: "8GB", label: "8 گیگابایت" },
      { value: "16GB", label: "16 گیگابایت" },
    ],

    brands: [
      { id: 1, title: "سامسونگ" },
      { id: 2, title: "هیوا" },
      { id: 3, title: "وندا" },
      { id: 4, title: "ایزی‌پوز" },
      { id: 5, title: "پارس‌پوز" },
    ],

      warrantyOptions: [
    { id: 1, title: "12 ماه گارانتی طلایی" },
    { id: 2, title: "18 ماه گارانتی نقره‌ای" },
    { id: 3, title: "24 ماه گارانتی الماس" },
    { id: 4, title: "6 ماه گارانتی معمولی" },
    { id: 5, title: "بدون گارانتی" },
  ],

  operatingSystems: [
    { id: 1, title: "Android" },
    { id: 2, title: "Windows" },
    { id: 3, title: "Linux" },
    { id: 4, title: "iOS" },
    { id: 5, title: "سیستم عامل اختصاصی" },
  ],

  };

  const [formData, setFormData] = useState({
    communicationMethod: [],
    ram: [],
    brand: [],
    os: [],
  });

  const [loadingStates, setLoadingStates] = useState({
    communicationLoading: false,
    ramLoading: false,
    brandLoading: false,
    osLoading: false,
  });

  return (
    <>
      <div className="bg-white flex flex-col h-screen overflow-scroll rtl px-4">
        <div className="relative mt-11">
          <div
            className={`flex flex-row justify-start items-center  z-20 w-full  gap-8`}
          >
            <div
              className={` relative w-full  flex flex-row items-center justify-between gap-[8px]`}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`h-6 font-bold text-lg leading-6 text-right text-black truncate`}
                >
                  فیلتر‌ها
                </div>
              </div>

              <div
                className="relative w-10 h-10 flex items-center justify-center p-[8px 10px 8px 6px] rounded-[12px] bg-[#FAFAFA] "
                onClick={() => {
                  closeModal();
                  deleteFilter();
                }}
              >
                <img
                  src="/svg/colsePageIcon.svg"
                  alt="colsePageIcon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative mt-3 mb-24">
          {/* <div className="w-full mt-1">
            <div
              className={`text-black w-full text-right font-normaltext-sm leading-24 `}
            >
              نام محصول
            </div>
            <div className="relative w-full mt-[4px] flex justify-evenly text-black">
              <Input
                textArea={false}
                maxLength={20}
                inputValue={formData.productName}
                inputChangeHandler={(e) => {
                  handleInputChange("productName", e);
                }}
                deleteInputHandler={() => {
                  deleteInputHandler("productName");
                }}
                name="productName"
                className="text-black"
                isDisabled={false}
              />
            </div>
          </div> */}

          {/* <div className="w-full flex gap-2 mt-4">
            <div className="w-1/2">
              <div
                className={`text-black w-full text-right font-normal text-sm leading-24 `}
              >
                قیمت از (ریال)
              </div>
              <div className="relative w-full mt-[4px] flex justify-evenly text-black">
                <Input
                  textArea={false}
                  maxLength={12}
                  typeInput="tel"
                  inputValue={formData.priceFrom == 0 ? "" : formData.priceFrom}
                  textError={formDataError.priceFrom}
                  onInput={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      priceFrom: formatInputValue(e.target.value),
                    }));
                  }}
                  deleteInputHandler={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      priceFrom: "",
                    }));
                  }}
                  className="text-black "
                  isDisabled={false}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div
                className={`text-black w-full text-right font-normal text-sm leading-24 `}
              >
                قیمت تا (ریال)
              </div>
              <div className="relative w-full mt-[4px] flex justify-evenly text-black">
                <Input
                  textArea={false}
                  maxLength={12}
                  typeInput="tel"
                  inputValue={formData.priceTo == 0 ? "" : formData.priceTo}
                  textError={formDataError.priceTo}
                  onInput={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      priceTo: formatInputValue(e.target.value),
                    }));
                  }}
                  deleteInputHandler={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      priceTo: "",
                    }));
                  }}
                  className="text-black "
                  isDisabled={false}
                />
              </div>
            </div>
          </div> */}
        

          {/* <div className="w-full mt-5">
            <div className="text-black w-full text-right font-normal text-sm leading-24 mb-2">
              حافظه رم
            </div>
            {loadingStates.ramLoading ? (
              <div className="flex">
                {Array.from(new Array(3)).map((_, index) => (
                  <Box key={index} sx={{ width: "48%", marginRight: 1 }}>
                    <Skeleton
                      sx={{ width: "95%", height: "50px" }}
                      variant="text"
                    />
                  </Box>
                ))}
              </div>
            ) : (
              <CheckItem
                items={mockPosData.ramOptions}
                selectedItems={formData.ram}
                idKey="value"
                labelKey="label"
                setSelectedItems={(selected) => {
                  setFormData((prev) => ({ ...prev, ram: selected }));
                }}
              />
            )}
          </div> */}

            <div className="w-full mt-5">
            <div className="text-black w-full text-right font-normal text-sm leading-24 mb-2">
               بستر ارتباطی
            </div>
            {loadingStates.communicationLoading ? (
              <div className="flex">
                {Array.from(new Array(3)).map((_, index) => (
                  <Box key={index} sx={{ width: "48%", marginRight: 1 }}>
                    <Skeleton
                      sx={{ width: "95%", height: "50px" }}
                      variant="text"
                    />
                  </Box>
                ))}
              </div>
            ) : (
              <CheckItem
                items={mockPosData.communicationMethods}
                selectedItems={formData.communicationMethod}
                idKey="id"
                labelKey="title"
                setSelectedItems={(selected) => {
                  setFormData((prev) => ({
                    ...prev,
                    communicationMethod: selected,
                  }));
                }}
              />
            )}
          </div>
          <div className="w-full mt-5">
  <div className="text-black w-full text-right font-normal text-sm leading-24 mb-2">
    گارانتی
  </div>
  {loadingStates.warrantyLoading ? (
    <div className="flex">
      {Array.from(new Array(3)).map((_, index) => (
        <Box key={index} sx={{ width: "48%", marginRight: 1 }}>
          <Skeleton
            sx={{ width: "95%", height: "50px" }}
            variant="text"
          />
        </Box>
      ))}
    </div>
  ) : (
    <CheckItem
      items={mockPosData.warrantyOptions}
      selectedItems={formData.warranty}
      idKey="id"
      labelKey="title"
      setSelectedItems={(selected) => {
        setFormData((prev) => ({ ...prev, warranty: selected }));
      }}
      // اگر نیاز به انتخاب چندگانه دارید:
      multiple={false} // یا true بسته به نیاز شما
      // استایل‌های اختیاری:
      containerClassName="grid grid-cols-2 gap-2"
      itemClassName="border rounded-lg p-3 hover:bg-gray-50"
      selectedItemClassName="bg-blue-50 border-blue-200"
    />
  )}
</div>
<div className="w-full mt-5">
  <div className="text-black w-full text-right font-normal text-sm leading-24 mb-2">
    سیستم عامل
  </div>
  {loadingStates.osLoading ? (
    <div className="flex">
      {Array.from(new Array(3)).map((_, index) => (
        <Box key={index} sx={{ width: "48%", marginRight: 1 }}>
          <Skeleton
            sx={{ width: "95%", height: "50px" }}
            variant="text"
          />
        </Box>
      ))}
    </div>
  ) : (
    <CheckItem
      items={mockPosData.operatingSystems}
      selectedItems={formData.os}
      idKey="id"
      labelKey="title"
      setSelectedItems={(selected) => {
        setFormData((prev) => ({ ...prev, os: selected }));
      }}
      multiple={true} // معمولاً یک دستگاه یک سیستم عامل دارد، پس false بهتر است
    />
  )}
</div>

          <div className="w-full mt-3">
            <div className="text-black w-full text-right font-normal text-sm leading-24 mb-2">
              برند
            </div>
            {loadingStates.brandLoading ? (
              <div className="flex">
                {Array.from(new Array(3)).map((_, index) => (
                  <Box key={index} sx={{ width: "48%", marginRight: 1 }}>
                    <Skeleton
                      sx={{ width: "95%", height: "50px" }}
                      variant="text"
                    />
                  </Box>
                ))}
              </div>
            ) : (
              <CheckItem
                items={mockPosData.brands}
                selectedItems={formData.brand}
                idKey="id"
                labelKey="title"
                setSelectedItems={(selected) => {
                  setFormData((prev) => ({ ...prev, brand: selected }));
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="z-[999999] bg-white h-20 w-full absolute bottom-0 flex justify-between pt-4 px-4 items-start">
        {" "}
        <button
          className="w-[70%] h-10 bg-custom-green text-white rounded-lg flex justify-center items-center"
          onClick={() => {
            closeModal();
            setSelectedFilter(formData);
          }}
        >
          تایید{" "}
        </button>
        <button
          className="w-[28%] h-10 border-custom-green border text-custom-green bg-white rounded-lg flex justify-center items-center"
          onClick={() => {
            closeModal();
            deleteFilter();
          }}
        >
          انصراف{" "}
        </button>
      </div>
    </>
  );
}

export default Filter;
