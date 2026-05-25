const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-[#f5f3ee] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto bg-white rounded-[32px] shadow-sm border border-[#ebe5d8] p-6 sm:p-10 lg:p-14">

        {/* HEADING */}
        <div className="text-center mb-12">
          <span className="bg-[#355e3b]/10 text-[#355e3b] px-4 py-2 rounded-full text-sm font-semibold">
            Herbalyze Policies
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#1f2a1f] mt-6">
            Privacy Policy
          </h1>

          <p className="text-gray-500 mt-4 text-sm sm:text-base">
            Last Updated: January 2026
          </p>
        </div>

        {/* INTRO */}
        <div className="space-y-6 text-gray-700 leading-8 text-sm sm:text-base">
          <p>
            At Herbalyze, your privacy is extremely important to us.
            This Privacy Policy explains how we collect, use, and
            protect your personal information when you visit our
            website, purchase our products, or use our services.
          </p>

          <p>
            By using our website, you agree to the collection and use
            of information in accordance with this policy.
          </p>
        </div>

        {/* SECTION 1 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Information We Collect
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">
            <p>We may collect personal information including:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Shipping & Billing Address</li>
              <li>Payment Information</li>
              <li>
                Health or wellness concerns shared during consultations
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            How We Use Your Information
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">
            <p>Your information may be used for:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Processing orders and payments</li>
              <li>Providing customer support</li>
              <li>Scheduling doctor consultations</li>
              <li>Sending order updates and notifications</li>
              <li>Improving our products and services</li>
              <li>Sending promotional offers and newsletters</li>
            </ul>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Data Protection
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            We implement strong security measures to protect your
            personal information from unauthorized access, misuse,
            or disclosure. Your payment information is processed
            securely through trusted payment gateways.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Cookies
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Our website may use cookies to improve user experience,
            analyze website traffic, and personalize content. You
            can disable cookies through your browser settings if
            preferred.
          </p>
        </div>

        {/* SECTION 5 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Third-Party Services
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            We may use third-party services such as payment providers,
            analytics tools, or delivery services to improve our
            operations. These providers only access information
            necessary to perform their services.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Your Rights
          </h2>

          <div className="space-y-5 text-gray-700 leading-8 text-sm sm:text-base">
            <p>You have the right to:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Access your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from promotional emails</li>
            </ul>
          </div>
        </div>

        {/* SECTION 7 */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2a1f] mb-5">
            Contact Us
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            If you have any questions regarding this Privacy Policy,
            feel free to contact our support team.
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
                Pechs Block 2, Karachi, Pakistan    
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;