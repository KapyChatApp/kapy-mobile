import React, { createContext, useContext, useState, ReactNode } from "react";

type MessageBoxContextType = {
  deletedMessageBox: string;
  waitDeleteMessageBox: (id: string) => void;
  completeDeleteMessageBox: () => void;
  inMessageBox: string;
  checkInMessageBox: (id:string)=>void;
  checkOutMessageBox: ()=>void;
};

const MessageBoxContext = createContext<MessageBoxContextType | undefined>(
  undefined
);

export const MessageBoxProvider = ({ children }: { children: ReactNode }) => {
  const [deletedMessageBox, setDeletedMessageBox] = useState("");
  const [inMessageBox, setInMessageBox] = useState("");

  const waitDeleteMessageBox = (id: string) => setDeletedMessageBox(id);
  const completeDeleteMessageBox = () => setDeletedMessageBox("");

  const checkInMessageBox = (id: string) => setInMessageBox(id);
  const checkOutMessageBox = () => setInMessageBox("");
  return (
    <MessageBoxContext.Provider
      value={{
        deletedMessageBox,
        waitDeleteMessageBox,
        completeDeleteMessageBox,
        inMessageBox, 
        checkInMessageBox,
        checkOutMessageBox
      }}
    >
      {children}
    </MessageBoxContext.Provider>
  );
};
export const useMessageBox = () => {
  const context = useContext(MessageBoxContext);
  if (!context) {
    throw new Error("useMessageBox must be used within a MessageBoxProvider");
  }
  return context;
};
