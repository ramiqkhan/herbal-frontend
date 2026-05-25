const RefundPolicy = () => {
  return (
    <div className="w-full bg-[#f5f3ee] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-sm border border-[#ebe5d8] p-6 sm:p-10 lg:p-14">

        {/* HEADING */}
        <div className="text-center mb-12">
          <span className="bg-[#355e3b]/10 text-[#355e3b] px-4 py-2 rounded-full text-sm font-semibold">
            Herbalyze Policies
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#1f2a1f] mt-6">
            Refund Policy
          </h1>

          <p className="text-gray-500 mt-4 text-sm sm:text-base">
            Last Updated: January 2026
          </p>
        </div>

        {/* INTRO */}
        <div className="space-y-6 text-gray-700 leading-8 text-sm sm:text-base">
          <p>
            At Herbalyze, customer satisfaction is our priority.
            We aim to provide high-quality herbal wellness products
            and a smooth shopping experience.
          </p>

          <p>
            This Refund Policy explains the conditions under which
            refunds, replacements, or returns may be accepted.
          </p>
        </div>

        {/* SECTION 1 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Eligibility for Refunds
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">

            <p>
              Refund requests may be accepted under the following
              conditions:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Wrong product delivered</li>

              <li>Damaged or defective product received</li>

              <li>Missing items from the order</li>

              <li>Expired product received</li>
            </ul>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Non-Refundable Items
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">

            <p>
              Refunds or returns will not be accepted for:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Opened or used products</li>

              <li>
                Products damaged due to customer mishandling
              </li>

              <li>
                Change of mind after order confirmation
              </li>

              <li>
                Products purchased during clearance sales
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Refund Request Timeline
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Customers must contact Herbalyze within 3 days of
            receiving the order to request a refund or replacement.
          </p>

          <p className="text-gray-700 leading-8 text-sm sm:text-base mt-4">
            Requests submitted after the allowed timeframe may not
            be accepted.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Refund Process
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">

            <ul className="list-disc pl-6 space-y-3">
              <li>
                Contact our support team with your order details
              </li>

              <li>
                Share clear images of the product if required
              </li>

              <li>
                Our team will review the request within 2-3 working days
              </li>

              <li>
                Approved refunds will be processed accordingly
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 5 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Refund Method
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Refunds may be issued through bank transfer, Easypaisa,
            JazzCash, or the original payment method used during
            purchase.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Replacement Policy
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            In some cases, Herbalyze may offer a replacement product
            instead of a refund depending on product availability
            and the nature of the issue.
          </p>
        </div>

        {/* SECTION 7 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Shipping Charges
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Shipping charges are non-refundable unless the refund
            request is due to an error caused by Herbalyze.
          </p>
        </div>

        {/* CONTACT */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Contact Information
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            If you have any questions regarding refunds or returns,
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

export default RefundPolicy;