"use client";

import { usePopupStore } from "@/store/popup-store";
import ContactPopup from "./contact";
import DownloadPopup from "./download";
import InquirePopup from "./inquire";
import JoinPopup from "./join";
import RegisterPopup from "./register";
import AlertPopup from "./alert";

export default function PopupProvider() {
  const {
    isContactOpen,
    isDownloadOpen,
    isInquireOpen,
    isJoinOpen,
    isRegisterOpen
  } = usePopupStore();

  return (
    <>
      {isContactOpen && <ContactPopup />}
      {isDownloadOpen && <DownloadPopup />}
      {isInquireOpen && <InquirePopup />}
      {isJoinOpen && <JoinPopup />}
      {isRegisterOpen && <RegisterPopup />}
      <AlertPopup />
    </>
  );
}
