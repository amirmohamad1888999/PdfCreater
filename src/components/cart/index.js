"use client";
import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../../context/cartContext"; // Import the cart context
import Image from "next/image";
import style from "./index.module.css";
import { GetAllCart, GetCartById, RemoveCartById } from "../../../APIGate/Cart";
import Loading from "@/components/Loading/index";
import { IncreaseCart, DecreaseCart } from "../../../APIGate/CartItem";
import { ToastContainer } from "react-toastify";
import ToastErrorIcon from "@/components/ToastErrorIcon";
import ToastClosBtn from "@/components/toastClosBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GetNewNotifications } from "../../../APIGate/Notification";
import { IoMdClose } from "react-icons/io";

const showErrorToast = (text) => {
  toast.error(text, {
    className: "toastError",
    icon: <ToastErrorIcon />,
    // closeButton: <ToastClosBtn />,
    closeOnClick: true,
    autoClose: 5000,
  });
};
const showSuccessToast = (text) => {
  toast.success(text, {
    className: "toastSuccess",
    // closeButton: <ToastClosBtn />,
    closeOnClick: true,
    autoClose: 5000,
  });
};

const Cart = () => {
  const {
    isCartOpen,
    toggleCart,
    orders,
    setOrders,
    GetAgain,
    setGetAgain,
    setCartCount,
    CartCount,
    setNotifCount,
    NotifCount,
  } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartDetail, setCartDetail] = useState("");
  const [CartId, setCartId] = useState("");
  const [DetailView, setDetailView] = useState(false);
  const formatNumber = (num) => num.toLocaleString();

  useEffect(() => {
    GetCarts();
    GetNotifications();
  }, []);

  const GetNotifications = async () => {
    let isSubmited = await GetNewNotifications();
    if (isSubmited.status === 200) {
      if (isSubmited.data.responseCode === 200) {
        setGetAgain(false);
        setNotifCount(
          isSubmited.data.value.response.length > 0
            ? isSubmited.data.value.response.length
            : 0
        );
      }
    }
  };

  useEffect(() => {
    if (GetAgain) {
      GetCarts();
      GetNotifications();
    }
  }, [GetAgain]);

  const GetCarts = async () => {
    setLoading(true);
    const headers = {};
    const body = {};

    const response = await GetAllCart(body, headers);
    if (response.data.responseCode === 200) {
      setOrders(response.data.value.response);
      setCartCount(response.data.value.cartCount);
      setGetAgain(false);
    } else {
      setOrders([]);
      setCartCount(0);
      setGetAgain(false);
    }
    setLoading(false);
  };

  const GetCart = async (id) => {
    setLoading(true);
    const response = await GetCartById(id);
    if (response.data.responseCode === 200) {
      setCartDetail(response.data.value.response);
      setDetailView(true);
    } else {
      setCartDetail("");
      setDetailView(false);
    }
    setLoading(false);
  };
  const DeleteCart = async (id) => {
    setLoading(true);
    const response = await RemoveCartById(id);
    if (response.data.responseCode === 200) {
      GetCarts();
    } else {
      showErrorToast(isSubmited.data.message);
    }
    setLoading(false);
  };

  const Increase = async (productAlias, merchantId) => {
    setLoading(true);
    try {
      const body = {
        productAlias: productAlias,
        merchantId: merchantId,
      };
      const isSubmited = await IncreaseCart(body);
      setLoading(false);
      if (isSubmited.data.responseCode === 200) {
        GetCart(CartId);
        GetCarts();
      } else {
        showErrorToast(isSubmited.data.message);
      }
    } catch (error) {
      showErrorToast("خطا در دریافت اطلاعات ");
    }
  };
  const Decrease = async (productAlias, merchantId) => {
    setLoading(true);
    try {
      const body = {
        productAlias: productAlias,
        merchantId: merchantId,
      };
      const isSubmited = await DecreaseCart(body);
      setLoading(false);
      if (isSubmited.data.responseCode === 200) {
        GetCart(CartId);
        GetCarts();
      } else {
        showErrorToast(isSubmited.data.message);
      }
    } catch (error) {
      showErrorToast("خطا در دریافت اطلاعات ");
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className={style.cartContainer}>
        {!DetailView ? (
          <>
            <div className="w-full flex px-5 py-2 justify-between bg-[#114F44]">
              <div className=" font-bold text-white mt-2 mr-3 ">سبد خرید</div>
              <div onClick={toggleCart} className="colse-btn-cart  ">
                <IoMdClose color="#fff" size={20} className="mt-1" />
              </div>
            </div>

            <div className={`${style.profileBack}`}>
              {orders.length > 0 ? (
                orders.map((e) => {
                  return (
                    <>
                      <div className={`${style.boxItemCart}`}>
                        <div className="flex relative  h-[12vh] w-[100%] justify-start  right-[2%] left-1 pt-3 text-[13px]">
                          <div className="ml-2 ">
                            <img
                              alt={e?.merchantLogo?.fileName}
                              className={style.logo}
                              src={e?.merchantLogo?.fileLink}
                            />
                          </div>
                          <div className="mt-1 font-bold">
                            {" "}
                            {e.merchantStoreName}
                            <div className="mt-1 text-[11px] flex font-thin">
                              <div>
                                {e.creationDateTime &&
                                  e.creationDateTime.substring(10, 20)}
                              </div>
                              <div className="mx-1">،</div>{" "}
                              <div>
                                {e.creationDateTime &&
                                  e.creationDateTime.substring(0, 10)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative   right-[5%] left-[3%] text-[11px] h-[calc(1vh)]  w-[94%]">
                          <div className="w-[96%] right-0  h-[1px] bg-gray-200 absolute top-[0%]"></div>
                        </div>
                        {e.cartItems.length > 0 ? (
                          <div className="relative  w-full">
                            {e.cartItems.map((a) => {
                              return (
                                <>
                                  <div className="w-[86%] mr-[7%] h-[40px] mt-1">
                                    <div className="flex justify-start">
                                      <div className="ml-2 w-[15%]">
                                        <img
                                          src={
                                            a.productPictures[0]
                                              ? a.productPictures[0].fileLink
                                              : null
                                          }
                                          className="w-[40px] h-[40px]"
                                          alt={a.fileName}
                                        />
                                      </div>
                                      <div className="mt-3 w-[60%] text-[11px] ">
                                        {a.productTitle} {`(${a.quantity})`}
                                      </div>

                                      <div
                                        className={`w-[25%] flex flex-col justify-end items-end`}
                                      >
                                        <div
                                          className={`text-[12px] truncate ${
                                            a.discount ||
                                            Number(a.discount) !== 0
                                              ? ""
                                              : "mb-2"
                                          }`}
                                        >
                                          {a.discount ||
                                          Number(a.discount) !== 0
                                            ? formatNumber(
                                                parseInt(
                                                  Number(
                                                    a.price -
                                                      (a.price * a.discount) /
                                                        100
                                                  )
                                                ) * a.quantity
                                              )
                                            : formatNumber(
                                                Number(a.price) * a.quantity
                                              )}{" "}
                                          ریال
                                        </div>
                                        {(a.discount ||
                                          Number(a.discount) !== 0) && (
                                          <div
                                            className={`${style.customstrikethrough} text-red-600 text-[10px] truncate`}
                                          >
                                            {formatNumber(
                                              Number(a.price) * a.quantity
                                            )}{" "}
                                            ریال
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-[86%] mr-[7%]  h-[1px] bg-gray-200 mt-2"></div>
                                </>
                              );
                            })}
                          </div>
                        ) : null}

                        <div className="relative h-auto mt-5 w-full bottom-2 flex justify-around">
                          <div
                            onClick={() => {
                              setCartId(e.id);
                              GetCart(e.id);
                            }}
                            className="text-center pt-2 w-[30%] mx-5 h-[30px] text-[12px] bg-[#114F44] text-[#fff] rounded-md  cursor-pointer"
                          >
                            ادامه{" "}
                          </div>
                          <div
                            onClick={() => {
                              setCartId(e.id);
                              DeleteCart(e.id);
                            }}
                            className="text-center pt-2 w-[30%] mx-5 h-[30px] text-[12px] bg-[#AD9082] text-[#fff] rounded-md  cursor-pointer"
                          >
                            حذف
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="mx-auto mt-[20%] webkit-center">
                  <img src="/png/icons8-empty-cart-64.png" className="" />
                  <div className="text-center mt-2">
                    {" "}
                    سبد خرید شما خالی میباشد
                  </div>
                </div>
              )}
            </div>
          </>
        ) : null}

        {DetailView ? (
          <>
            <div className="w-full flex px-5 py-2 justify-between bg-[#114F44]">
              <div className=" font-bold text-white mt-2 mr-3 ">سبد خرید</div>
              <div
                onClick={() => {
                  setDetailView(false);
                  setCartDetail("");
                }}
                className="colse-btn-cart  "
              >
                <IoMdClose color="#fff" size={20} className="mt-1" />
              </div>
            </div>

            <div className="absolute right-5 top-[12%]  text-[#114F44]">
              فروشگاه{" "}
              {
                <span className="font-bold">
                  {cartDetail.merchantStoreName}
                </span>
              }
            </div>
            <div className={`${style.profileBackCart}`}>
              {cartDetail && cartDetail.cartItems.length > 0
                ? cartDetail.cartItems.map((e) => {
                    return (
                      <>
                        <div className={`${style.boxItem}`}>
                          <div className="flex w-[50%] justify-start absolute right-[2%] left-1 top-[5%] text-[13px]">
                            <div className="ml-2">
                              <img
                                alt={
                                  e.length > 0 && e.productPictures[0].fileName
                                }
                                className={style.logo}
                                src={
                                  e.productPictures.length > 0 &&
                                  e.productPictures[0].fileLink
                                }
                              />
                            </div>
                            <div className="mt-2 font-bold">
                              {" "}
                              {e.productTitle}{" "}
                            </div>
                          </div>

                          <div className="absolute top-[28%] w-full px-3 text-[11px]">
                            <div className="flex justify-between mt-1">
                              <div>نوع گل : </div>
                              <span className="font-bold">{e.groupTitle}</span>
                            </div>

                            <div className="flex justify-between  mt-1">
                              <div>سبک : </div>
                              <span className="font-bold">{e.unitTitle}</span>
                            </div>

                            {/* <div className="flex justify-between  mt-1">
                              <div>مناسبت : </div>
                              <span className="font-bold">
                                {e.productOccasions.length > 0
                                  ? e.productOccasions
                                      .map((a) => a.title)
                                      .join(" , ")
                                  : null}
                              </span>
                            </div> */}

                            <div className="flex justify-between  mt-1">
                              <div>شاخص : </div>
                              <span className="font-bold">
                                {e.productIndicators.length > 0
                                  ? e.productIndicators
                                      .map((a) => a.value)
                                      .join(" , ")
                                  : null}
                              </span>
                            </div>

                            <div className="flex justify-between  mt-1">
                              <div>تخفیف : </div>
                              <span className="font-bold">
                                {e.discount + "%"}
                              </span>
                            </div>
                          </div>

                          <div className="absolute w-full bottom-3 right-2">
                            <div
                              className={`w-[33%]   flex justify-around rounded-xl ${style.count}`}
                            >
                              <Image
                                onClick={() => {
                                  Increase(
                                    e.productAlias,
                                    cartDetail.merchantId
                                  );
                                }}
                                src="/svg/plus.svg"
                                alt="plus"
                                width={8}
                                height={8}
                                className="-mt-1"
                              />

                              <div>{e.quantity}</div>

                              <Image
                                onClick={() => {
                                  Decrease(
                                    e.productAlias,
                                    cartDetail.merchantId
                                  );
                                }}
                                src="/svg/minus.svg"
                                alt="minus"
                                width={8}
                                height={8}
                                className="-mt-1"
                              />
                            </div>
                          </div>

                          <div className="absolute bottom-2 left-2">
                            <div
                              className={`flex flex-col justify-end items-end`}
                            >
                              <div className="text-sm truncate">
                                {e.discount || Number(e.discount) !== 0
                                  ? formatNumber(
                                      parseInt(
                                        Number(
                                          e.price - (e.price * e.discount) / 100
                                        )
                                      ) * e.quantity
                                    )
                                  : formatNumber(
                                      Number(e.price) * e.quantity
                                    )}{" "}
                                ریال
                              </div>
                              {(e.discount || Number(e.discount) !== 0) && (
                                <div
                                  className={`${style.customstrikethrough} text-red-600 text-[10px] truncate`}
                                >
                                  {formatNumber(Number(e.price) * e.quantity)}{" "}
                                  ریال
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : null}

              <div className="z-[999999] bg-white h-[93px] w-full fixed bottom-0 ">
                <div
                  className={`${style.container} w-[33%] flex justify-around items-center px-4`}
                >
                  <button
                    className="w-[30%] h-8 bg-[#114F44] text-white rounded-lg flex justify-center items-center"
                    onClick={() => {
                      // router.push(
                      //   `/products/detail/order?productAlias=${productInfo.alias}`
                      // );
                      // Increase(productInfo.alias, productInfo.merchantId);
                      toggleCart();
                      router.push(
                        `/products/productInfo/order?${cartDetail.id}`
                      );
                    }}
                  >
                    ادامه
                  </button>

                  <div
                    className={`w-[33%] flex flex-col justify-end items-end`}
                  >
                    <div className="text-sm truncate">
                      {formatNumber(Number(cartDetail.totalPrice))} ریال
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {loading && <Loading />}
      <ToastContainer position="top-center" rtl={true} />
    </>
  );
};

export default Cart;
