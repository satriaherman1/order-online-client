import LocalStorageService from "@src/services/localstorage.service";
import NotificationsService from "@src/services/notifications.service";
import { PushNotificationPayload } from "@src/types/notifications";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
  const notificationService = new NotificationsService();

  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);

  const isCheckedOutRef = useRef(isCheckedOut);

  const handleCheckout = async () => {
    setIsCheckedOut(true);
    setIsLoading(true);
    const loadingTimedOut = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(loadingTimedOut);
    }, 2000);
  };

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
    isCheckedOutRef.current = isCheckedOut; // Update nilai ref setiap state berubah
  }, [isCheckedOut]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log("is checked out :", isCheckedOutRef.current); // Sekarang mendapatkan nilai terbaru
      if (!isCheckedOutRef.current) return;
      handleSendNotifications();
      event.preventDefault();
      event.returnValue = "";
      setIsCheckedOut(false);
    };

    const handleVisibilityChange = () => {
      if (isCheckedOutRef.current && document.hidden) {
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

  return (
    <div className="absolute left-1/2 top-1/2 p-9 rounded-2xl bg-white w-[95%] max-w-[800px] -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-4xl font-bold text-center">Your Order</h1>

      {err && (
        <div className="bg-red-300 text-red-700 font-semibold text-2xl">
          {err}
        </div>
      )}
      <div className="overflow-x-scroll table-fixed">
        <table className="w-full mt-12">
          <thead className="bg-gray-100">
            <tr className="border-y border-gray-300 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3">
                <div className="flex gap-x-4">
                  <img src="/products/shirt1.webp" width={120} />
                  <div className="flex flex-col ">
                    <span className="font-bold whitespace-nowrap">
                      Man Shirt Large Sizes
                    </span>
                    <span className="text-gray-500 whitespace-nowrap">
                      Color : white
                    </span>
                    <span className="text-gray-500 whitespace-nowrap">
                      Size : L
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-3">2</td>
              <td className="p-3">Rp. 300.000</td>
              <td className="p-3">Rp. 600.000</td>
            </tr>
            <tr>
              <td className="p-3">
                <div className="flex gap-x-4">
                  <img src="/products/shirt1.webp" width={120} />
                  <div className="flex flex-col ">
                    <span className="font-bold whitespace-nowrap">
                      Man Shirt Large Sizes
                    </span>
                    <span className="text-gray-500 whitespace-nowrap">
                      Color : white
                    </span>
                    <span className="text-gray-500 whitespace-nowrap">
                      Size : L
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-3">2</td>
              <td className="p-3">Rp. 300.000</td>
              <td className="p-3">Rp. 600.000</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-y  border-gray-300">
              <td className="p-3 font-semibold">Total</td>
              <td className="p-3 font-semibold"></td>
              <td className="p-3 font-semibold"></td>
              <td className="p-3 font-semibold">Rp. 750.000</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="px-6 py-2 outline-none bg-lime-700 hover:bg-lime-600 text-white cursor-pointer rounded-full mt-4"
                >
                  {isLoading ? "Loading..." : "Checkout"}
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
