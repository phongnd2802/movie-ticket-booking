"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axiosClient from "@/lib/auth/axiosClient";
import { conformPayment } from "@/endpoint/auth";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      // Set payment details for display
      setPaymentDetails({
        amount: params.vnp_Amount
          ? Number.parseInt(params.vnp_Amount) / 100
          : 0, // Convert to actual amount
        bankCode: params.vnp_BankCode || "",
        orderInfo: params.vnp_OrderInfo || "",
        responseCode: params.vnp_ResponseCode || "",
        transactionStatus: params.vnp_TransactionStatus || "",
        txnRef: params.vnp_TxnRef || "",
      });
      const params1 = new URLSearchParams(searchParams.toString());

      try {
        const response = await axiosClient.get(
          `${conformPayment}?${params1.toString()}`
        );
        if (response.status === 200) {
          if (response.data.code === 20000) {
            console.log("Kết quả xác minh thanh toán:", response.data);
            setStatus("success");
          } else {
            setStatus("error");
            console.error("Lỗi khi xác minh thanh toán:", error);
          }
        }
      } catch (error) {
        setStatus("error");
        console.error("Lỗi khi xác minh thanh toán:", error);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Payment Verification
        </h1>

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
            <p className="text-lg text-gray-700">Verifying your payment...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please do not close this page
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Your transaction has been completed successfully.
            </p>
            {paymentDetails && (
              <div className="w-full bg-gray-50 p-4 rounded-md">
                <PaymentDetailItem
                  label="Amount"
                  value={`${paymentDetails.amount.toLocaleString()} VND`}
                />
                <PaymentDetailItem
                  label="Order ID"
                  value={paymentDetails.txnRef}
                />
                <PaymentDetailItem
                  label="Bank"
                  value={paymentDetails.bankCode}
                />
                <PaymentDetailItem
                  label="Description"
                  value={decodeURIComponent(
                    paymentDetails.orderInfo.replace(/\+/g, " ")
                  )}
                />
              </div>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-6">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 text-center mb-6">
              We couldn't verify your payment. Please try again or contact
              support.
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentDetailItem({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
