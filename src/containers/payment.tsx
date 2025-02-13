import SuccessStatus from "@src/components/commons/success-status";
import WarningIcon from "@src/components/commons/warning-icon";
import { messaging } from "@src/config/firebase";
import DateService from "@src/services/date.service";
import LocalStorageService from "@src/services/localstorage.service";
import NotificationsService from "@src/services/notifications.service";
import {
  PushNotificationPayload,
  SilentNotificationPayload,
} from "@src/types/notifications";
import classNames from "classnames";
import { onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";

export default function Payment() {
  const notificationService = new NotificationsService();
  const isCheckedOut = LocalStorageService.getItem("isCheckedOut");

  const [err, setErr] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(
    JSON.parse(LocalStorageService.getItem("isPaid"))
  );

  const handleSendPushNotifications = async () => {
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

  const handleSendSilentNotifications = async () => {
    try {
      setIsLoading(true);
      const payload: SilentNotificationPayload = {
        token: LocalStorageService.getItem("deviceToken"),
        data: {
          isPaid: "true",
        },
      };
      const response = await notificationService.sendSilentNotifications(
        payload
      );

      console.log(response);
    } catch (err: any) {
      setErr(err);
    }
  };

  const orderAgain = () => {
    localStorage.removeItem("isPaid");
    localStorage.removeItem("isCheckedOut");
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isCheckedOut || isPaid) return;

      handleSendPushNotifications();
      event.preventDefault();
      event.returnValue = "";
    };

    const handleVisibilityChange = () => {
      try {
        const isPaid = JSON.parse(LocalStorageService.getItem("isPaid"));
        if (isPaid) return;
      } catch (err) {
        console.error("Error Parsing isPaid");
      }

      if (isCheckedOut && document.hidden) {
        handleSendPushNotifications();
      }
    };

    const handleIsPaid = () => {
      setIsLoading(false);
      setIsPaid(JSON.parse(LocalStorageService.getItem("isPaid")));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("storage", handleIsPaid);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("storage", handleIsPaid);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, ({ data }) => {
      if (!data) return;

      if (data.isPaid === undefined) return;

      try {
        localStorage.setItem("isPaid", "true");
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console;
        setErr("Cannot Update Payment Status");
      }
    });

    return () => unsubscribe();
  }, []);

  const date = DateService.formatDate(new Date());
  const time = DateService.formatTime12Hour(new Date());
  return (
    <div className="fixed left-1/2 top-1/2 p-9 rounded-2xl bg-white w-[95%] max-w-[600px] -translate-x-1/2 -translate-y-[46%]">
      {isPaid ? (
        <SuccessStatus className="absolute -top-[0px] left-1/2 -translate-1/2" />
      ) : (
        <WarningIcon className="absolute -top-[0px] left-1/2 -translate-1/2" />
      )}
      {isPaid ? (
        <h1 className="text-4xl font-bold text-center text-green-600 mt-8">
          Payment Success
        </h1>
      ) : (
        <h1 className="text-4xl font-bold text-center text-amber-600 mt-8">
          Pending
        </h1>
      )}
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

        <div className="mt-8">
          {isPaid ? (
            <button
              onClick={orderAgain}
              className="px-6 py-2 block w-full  outline-none   cursor-pointer rounded-full bg-green-600 hover:bg-green-500 text-white"
            >
              Order Again
            </button>
          ) : (
            <button
              disabled={isPaid}
              onClick={handleSendSilentNotifications}
              className={classNames({
                "px-6 py-2 block w-full  outline-none   cursor-pointer rounded-full ":
                  true,
                "bg-lime-700 hover:bg-lime-600 text-white": !isPaid,
                "bg-transparent border-2 border-lime-700 text-lime-800 opacity-50 font-semibold":
                  isPaid,
              })}
            >
              {isLoading ? "Loading..." : "Pay Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
