"use client";

import { useState } from "react";
import { X } from "lucide-react";

const TicketConfirmationModal = ({
  isOpen,
  onClose,
  ticketInfo,
  onPayment,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="p-6">
          <h2 className="text-center text-xl font-medium text-gray-800 mb-6">
            THÔNG TIN ĐẶT VÉ
          </h2>

          {/* Movie info */}
          <div className="border rounded-md mb-4">
            <div className="flex items-start p-4">
              <div className="w-24 text-gray-700 font-medium">Phim</div>
              <div className="flex-1">
                <div className="text-blue-600 font-medium">
                  {ticketInfo.movieName || "Biết Đội Sấm Sét"}*
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-gray-700">{"IMAX 2D Phụ Đề"}</span>
                  <span className="ml-2 bg-orange-500 text-white px-2 py-0.5 text-xs rounded">
                    {"T13"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Theater info */}
          <div className="border rounded-md mb-4">
            <div className="flex items-start p-4">
              <div className="w-24 text-gray-700 font-medium">Rạp</div>
              <div className="flex-1">
                <div className="text-gray-800 font-medium">
                  {ticketInfo.cinemal || "Galaxy Sala"}
                </div>
                <div className="text-gray-700 mt-1">
                  {ticketInfo.showId || "22:00 - Thứ Hai, 05/05/2025"}
                </div>
              </div>
            </div>
          </div>

          {/* Format info */}
          <div className="border rounded-md mb-4">
            <div className="flex items-start p-4">
              <div className="w-24 text-gray-700 font-medium"></div>
              <div className="flex-1 text-gray-700">
                {"IMAX"}
                <div className="mt-1">{"Nguoi Lon IMAX with LASER A5"}</div>
              </div>
            </div>
          </div>

          {/* Total price */}
          <div className="border rounded-md mb-6">
            <div className="flex items-center p-4">
              <div className="w-24 text-gray-700 font-medium">Tổng</div>
              <div className="flex-1">
                <div className="bg-blue-600 text-white font-medium py-2 px-4 text-center">
                  {ticketInfo.totalPrice || "149.000 VND"}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 border-dashed"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </span>
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="mb-6">
            <div className="flex items-start mb-2">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="w-4 h-4 border border-gray-300 rounded accent-blue-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  Tôi xác nhận các thông tin đặt vé đã chính xác
                </label>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="privacy"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={() => setPrivacyAccepted(!privacyAccepted)}
                  className="w-4 h-4 border border-gray-300 rounded accent-blue-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacy" className="text-gray-700">
                  Tôi đồng ý các{" "}
                  <span className="text-orange-500">Điều khoản dịch vụ</span> và{" "}
                  <span className="text-orange-500">
                    Chính sách bảo mật & Chia sẻ thông tin
                  </span>{" "}
                  của Galaxy Cinema.
                </label>
              </div>
            </div>
          </div>

          {/* Payment button */}
          <button
            onClick={() => {
              if (termsAccepted && privacyAccepted) {
                onPayment();
              }
            }}
            disabled={!termsAccepted || !privacyAccepted}
            className={`w-full py-3 text-white font-medium rounded-md 
              ${
                termsAccepted && privacyAccepted
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmationModal;
