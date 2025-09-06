import Modal from "react-modal";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

function UnderReview({ openModal , title , Des ,imgSrc }) {
  const router = useRouter();
  const pathname = usePathname();

  const exitHandler = () => {
    localStorage.removeItem("UserViraNexMobile");
    localStorage.removeItem("refreshTokenViraNex");
    localStorage.removeItem("tokenViraNex");
    router.push("/notificationPermision");

    // router.push("/registration");
  };
  const updateHandler = () => {
    if (pathname === "/splash/") {
      window.location.reload();
    } else {
      router.push("/splash");
    }
  };

  
  return (
    <Modal
      isOpen={openModal}
      //   onRequestClose={modalCloseHandler}
      overlayClassName="osOverlay"
      contentLabel="Example Modal"
    >
      <div className="splashBack flex flex-col items-center bg-gray-200 w-full h-full box-border">
        <div className="px-5 text-justify text-base font-bold mt-8">
          {title}
        </div>
        <Image
          src={imgSrc}
          alt="Logo"
          width={200}
          height={200}
          className="mt-4"
        />
        <div className="px-5 text-justify text-sm  mt-4">
          {Des}
        </div>
        {/* <div className="z-[999999] h-20 w-full absolute bottom-0 flex justify-between px-4 items-start gap-3">
          <button
            className={`w-1/2 h-10 bg-custom-gray-pink text-white rounded-lg flex justify-center items-center`}
            onClick={updateHandler}
          >
            بروزرسانی
          </button>
          <button
            className={`w-1/2 h-10 bg-custom-green text-white rounded-lg flex justify-center items-center `}
            onClick={exitHandler}          >
            خروج
          </button>
        </div> */}
      </div>
    </Modal>
  );
}

export default UnderReview;
