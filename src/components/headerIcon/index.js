import { useRouter } from "next/navigation";
import { LuWallet, LuShoppingBasket } from "react-icons/lu";
import Notification from "../notification";

export default function GlobalToolbar() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        <div
          className="relative w-10 h-10 flex items-center justify-center rounded-[12px] bg-white bg-opacity-10 cursor-pointer"
          onClick={() => router.push("/wallet")}
        >
          <LuWallet color="white" size={20} />
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className="relative w-10 h-10 flex items-center justify-center rounded-[12px] bg-white bg-opacity-10 cursor-pointer"
          onClick={() => router.push("/cart")}
        >
          <LuShoppingBasket color="white" size={20} />
        </div>
      </div>
      <Notification />
    </div>
  );
}
