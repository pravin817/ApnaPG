import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import api from "../../backend";

const VerifyUsersDocuments = () => {
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnverifiedDocuments = async () => {
      try {
        const res = await api.post(
          "/admin/unverified-documents",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res?.data?.success) {
          setUsers(res.data.users);
          setLoading(false);
        } else {
          toast.error("Failed to fetch users");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUnverifiedDocuments();
  }, []);

  const verifyDocument = async (userId, status) => {
    try {
      const res = await api.post(
        `/admin/verify-document/${userId}`,
        {
          verified: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        toast.success("Document verified successfully");
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        toast.error("Failed to verify document");
      }
    } catch (error) {
      console.error("Error verifying document:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  if (user && user.role !== "admin") {
    toast.error("You are not authorized to access this page");
    navigate("/");
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-10 xl:px-20 pb-10">
      <section className="pt-8 flex flex-col gap-5">
        <div className="flex flex-rows gap-3 items-center sticky top-20 px-2 py-2 bg-white">
          <img
            src={backIcon}
            alt="back"
            onClick={() => navigate(-1)}
            className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
          />
          <h5 className="text-[#222222] text-xl font-semibold">
            Verify Users Documents
          </h5>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <div className="">
            <div className="inline-block min-w-full py-2">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="text-xs text-[#717171] font-medium border-b border-[#dddddd]">
                    <tr>
                      <th scope="col" className="px-3 py-2">
                        SR.NO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        FirstName
                      </th>
                      <th scope="col" className="px-6 py-4">
                        LastName
                      </th>
                      <th scope="col" className="px-6 py-4">
                        ProfileImage
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Government Document
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-8 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map(
                      (user, index) =>
                        !user.governmentDocumentVerification.verified && (
                          <tr
                            key={user._id}
                            className="border hover:bg-[#F9FAFF] hover:cursor-pointer rounded-md"
                          >
                            <td className="px-6 py-4 w-[20px]">{index + 1}</td>
                            <td className="px-6 py-4">{user.name.firstName}</td>
                            <td className="px-6 py-4">{user.name.lastName}</td>
                            <td className="px-6 py-4">
                              <img
                                src={user?.profileImg}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                              />
                            </td>
                            <td className="px-6 py-4">
                              {user.governmentDocumentVerification
                                .documentUrl ? (
                                <div>
                                  <img
                                    src={
                                      user.governmentDocumentVerification
                                        .documentUrl
                                    }
                                    alt="government document"
                                    className="w-72 h-72 rounded-md"
                                  />
                                  <a
                                    href={
                                      user.governmentDocumentVerification
                                        .documentUrl
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View Document
                                  </a>
                                </div>
                              ) : (
                                <p>No document uploaded</p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {user.governmentDocumentVerification.documentType}
                            </td>
                            <td className="px-6 py-4">
                              {user.governmentDocumentVerification.verified
                                ? "Verified"
                                : "Unverified"}
                            </td>
                            <td className="px-6 py-4 ">
                              <div className="flex gap-2 items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    verifyDocument(user._id, true);
                                  }}
                                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Verify
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    verifyDocument(user._id, false);
                                  }}
                                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerifyUsersDocuments;
