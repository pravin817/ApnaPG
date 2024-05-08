import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Help = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a place?",
      answer:
        "To book a place on ApanaPG, simply navigate to the listing you're interested in and click on the 'Book Now' button. Follow the instructions to complete your booking process.",
    },
    {
      question: "How do I contact support?",
      answer:
        "If you need assistance or have any questions, you can contact our support team by sending an email to support@apanapg.com. We'll be happy to help you!",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking by navigating to your bookings page and selecting the booking you wish to cancel. Follow the cancellation instructions provided.",
    },
    {
      question: "How do I edit my profile information?",
      answer:
        "To edit your profile information, go to your account settings and select the 'Edit Profile' option. You can update your information there.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose your preferred payment method during the booking process.",
    },
  
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="mt-8 md:mt-20 xl:px-20 xl:mx-auto max-w-screen-xl px-8 md:px-12">
      <div className="p-3">
        <h1 className="text-3xl font-semibold mb-6">ApanaPG Help Center</h1>
        <div className="bg-white rounded-lg p-6">
          {faqs.map((list, i) => {
            return (
              <div key={i} className="py-5">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none text-[#222222] text-xl">
                    <span className="text-sm sm:text-base">{list.question}</span>
                    <span className="transition duration-300 group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-[#717171] text-sm sm:text-base mt-3 group-open:animate-fadeIn transition duration-700">
                    {list?.answer}
                  </p>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Help;
