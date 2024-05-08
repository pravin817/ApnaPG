import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LiaGreaterThanSolid } from "react-icons/lia";
import backIcon from "../../assets/BasicIcon/backIcon.png";

const governmentDocumentDetail = [
  {
    id: 1,
    title: "Passport",
    description: "Face photo page",
    to: "/doc",
  },
  {
    id: 2,
    title: "Aadhaar Card",
    description: "Front and back page",
    to: "/verify-phone",
  },
  {
    id: 3,
    title: "PAN Card",
    description: "Front and back page",
    to: "/verify-email",
  },
];

const VerifyDocuments = () => {
  const photos = useSelector((state) => state.room.newRoom?.photos);
  const user = useSelector((state) => state.user.userDetails);
  const userId = user?._id;
  const navigate = useNavigate();

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <div className="flex flex-row gap-3 items-center" onClick={() => navigate(-1)}>
        <img
          src={backIcon}
          alt="back"
          className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
        />
        <h5 className="text-[#222222] text-2xl font-semibold">Verify Documents</h5>
      </div>

      <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />
      
      {/* Responsive div starts here */}
      <div className="mt-10 lg:w-3/4 xl:w-1/2 mx-auto">
        <div className="mt-2">
          <p className="text-[#222222] font-semibold text-xl">
            Which document would you like to upload?
          </p>

          <div className="mt-4">
            {governmentDocumentDetail.map((document) => (
              <div key={document.id}>
                <Link
                  to={`/users/show/${userId}/verify-account/verify-documents/doc/${document.id}`}
                  className="flex items-center justify-between border mb-4 p-3 rounded-lg hover:bg-[#f1f1f1] cursor-pointer transition duration-200"
                >
                  <div>
                    <h4 className="text-[#222222] text-base md:text-[18px] font-medium">
                      {document.title}
                    </h4>
                    <p className="text-base md:text-sm mt-2 text-[#717171]">
                      {document.description}
                    </p>
                  </div>
                  <div>
                    <LiaGreaterThanSolid />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Responsive div ends here */}
    </section>
  );
};

export default VerifyDocuments;
