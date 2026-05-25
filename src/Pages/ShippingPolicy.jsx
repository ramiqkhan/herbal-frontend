const ShippingPolicy = () => {
  return (
    <div className="w-full bg-[#f5f3ee] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-sm border border-[#ebe5d8] p-6 sm:p-10 lg:p-14">

        {/* HEADING */}
        <div className="text-center mb-12">
          <span className="bg-[#355e3b]/10 text-[#355e3b] px-4 py-2 rounded-full text-sm font-semibold">
            Herbalyze Policies
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#1f2a1f] mt-6">
            Shipping Policy
          </h1>

          <p className="text-gray-500 mt-4 text-sm sm:text-base">
            Last Updated: January 2026
          </p>
        </div>

        {/* INTRO */}
        <div className="space-y-6 text-gray-700 leading-8 text-sm sm:text-base">
          <p>
            At Herbalyze, we are committed to delivering your herbal
            wellness products safely and on time across Pakistan.
          </p>

          <p>
            This Shipping Policy explains our shipping process,
            delivery timelines, charges, and other important details.
          </p>
        </div>

        {/* SECTION 1 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Nationwide Shipping
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Herbalyze provides nationwide shipping across Pakistan.
            We work with trusted courier partners to ensure safe
            and reliable delivery of your orders.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Delivery Time
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">

            <ul className="list-disc pl-6 space-y-3">
              <li>Karachi: 1-2 Working Days</li>

              <li>Major Cities: 3-5 Working Days</li>

              <li>Remote Areas: 5-7 Working Days</li>

              <li>
                Delivery times may vary during holidays or sales periods.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Shipping Charges
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Shipping charges are calculated based on your location
            and order value.
          </p>

          <div className="mt-5 bg-[#f8f6f1] border border-[#ebe5d8] rounded-2xl p-5">

            <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
              <li>• Standard Shipping Charges Apply</li>

              <li>• Free Shipping on Selected Promotions</li>

              <li>• Cash on Delivery Available Nationwide</li>
            </ul>
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Order Processing
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Orders are processed within 24 hours after confirmation.
            Orders placed on weekends or public holidays may be
            processed on the next working day.
          </p>
        </div>

        {/* SECTION 5 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Order Tracking
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Once your order is shipped, Herbalyze will provide
            tracking details via email or WhatsApp so you can
            monitor your shipment status.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Delayed or Failed Deliveries
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Delivery delays may occur due to weather conditions,
            courier issues, public holidays, or incorrect shipping
            information provided by customers.
          </p>

          <p className="text-gray-700 leading-8 text-sm sm:text-base mt-4">
            Herbalyze is not responsible for delays caused by
            external courier services.
          </p>
        </div>

        {/* SECTION 7 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Incorrect Address
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Customers are responsible for entering accurate shipping
            information. Herbalyze will not be responsible for
            orders delivered to incorrect addresses provided by
            customers.
          </p>
        </div>

        {/* CONTACT */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Contact Information
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            If you have any questions regarding shipping or delivery,
            please contact Herbalyze support.
          </p>

          <div className="mt-6 bg-[#f8f6f1] rounded-2xl p-5 border border-[#ebe5d8] space-y-3 text-sm sm:text-base">

            <p>
              <span className="font-semibold text-[#1f2a1f]">
                Email:
              </span>{" "}
              info.herbalyze@gmail.com
            </p>

            <p>
              <span className="font-semibold text-[#1f2a1f]">
                Phone:
              </span>{" "}
              (+92) 3292608369
            </p>

            <p>
              <span className="font-semibold text-[#1f2a1f]">
                Address:
              </span>{" "}
              PECHS Block 2, Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;