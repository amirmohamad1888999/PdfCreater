"use client";
import { createContext, useState } from "react";
export const NotifCountContext = createContext([0, () => {}]);
const UserContext = (props) => {
  const [notifCountC, setNotifCountC] = useState(0);
  return (
      <NotifCountContext.Provider value={[notifCountC, setNotifCountC]}>
            {props.children}
      </NotifCountContext.Provider>
  );
};

export default UserContext;


