import DateService from "@src/services/date.service";
import LocalStorageService from "@src/services/localstorage.service";
import NotificationsService from "@src/services/notifications.service";
import { PushNotificationPayload } from "@src/types/notifications";
import { useEffect, useState } from "react";

export default function Payment() {
  const notificationService = new NotificationsService();
  const isCheckedOut = LocalStorageService.getItem("isCheckedOut");
  const [err, setErr] = useState<string>();
  const isPaid = LocalStorageService.getItem("isPaid");

  const handleSendNotifications = async () => {
    try {
      const notifPayload: PushNotificationPayload = {
        token: LocalStorageService.getItem("deviceToken"),
        title: "Payment Created",
        body: "Complete payment to process your order",
      };
      const response = await notificationService.sendPushNotifications(
        notifPayload
      );
      console.log(response);
    } catch (err: any) {
      alert("cannot send notifications");
      setErr(err);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isCheckedOut) return;
      handleSendNotifications();
      event.preventDefault();
      event.returnValue = "";
    };

    const handleVisibilityChange = () => {
      if (isCheckedOut && document.hidden) {
        handleSendNotifications();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  const date = DateService.formatDate(new Date());
  const time = DateService.formatTime12Hour(new Date());
  return (
    <div className="fixed left-1/2 top-1/2 p-9 rounded-2xl bg-white w-[95%] max-w-[600px] -translate-x-1/2 -translate-y-1/2">
      <div className="absolute border-4 border-white shadow -top-[0px] left-1/2 -translate-1/2 bg-amber-500 w-[100px] h-[100px] rounded-full flex justify-center items-center text-4xl font-black text-white">
        !
      </div>

      <h1 className="text-4xl font-bold text-center text-amber-600 mt-8">
        Pending
      </h1>
      {err && (
        <div className="bg-red-300 text-red-700 font-semibold text-2xl">
          {err}
        </div>
      )}
      <div className="mt-12  border-t border-dashed">
        <section className="flex flex-wrap gap-y-3 justify-between  py-8 border-gray-400">
          <div>
            <p className="text-gray-400 font-light">Date</p>
            <p className="font-semibold text-xl">{date}</p>
          </div>
          <div>
            <p className="text-gray-400 font-light">Time</p>
            <p className="font-semibold text-xl">{time}</p>
          </div>
        </section>
        <section className="flex flex-wrap gap-y-3 mt-4 justify-between py-3 border-y border-dashed  border-gray-400">
          <div>
            <p className="text-gray-400 font-light">Total</p>
            <h2 className="font-bold text-3xl">Rp 600.000</h2>
          </div>
        </section>

        <button className="px-6 py-2 block mt-8 w-full  outline-none bg-lime-700 hover:bg-lime-600 text-white cursor-pointer rounded-full ">
          Pay Now
        </button>
      </div>
    </div>
  );
}
