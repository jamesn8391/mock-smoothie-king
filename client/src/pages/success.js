import React from "react";

const Success = () => {
  return (
    <div style={{marginTop: "15%"}}class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-green-500 text-white py-4 text-center font-bold text-lg uppercase tracking-wide">
          Order Confirmed!
        </div>
        <div class="py-4 px-6">
          <p class="text-gray-700 text-base">
            Thank you for your order. Your order has been confirmed for Smoothie King
            at 275 Joe Routt Blvd, College Station, TX 77843.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
