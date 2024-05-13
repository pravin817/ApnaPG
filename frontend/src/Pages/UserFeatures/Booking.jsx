import { useEffect, useState } from "react";
import api from "../../backend";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textDecoration: "underline",
  },
});

const Booking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.post(
          "/reservations/bookings",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("The booking data : ", res?.data?.booking);

        if (res?.data?.success) {
          setBookingData(res?.data?.booking);
          setLoading(false);
        } else {
          toast.success("No booking found !");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-600" />
      </div>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-10 xl:px-20 pb-10">
      <section className="pt-8 flex flex-col gap-5">
        <div className="flex flex-rows gap-3 items-center sticky top-20 px-2 py-2 bg-white">
          <img
            src={backIcon}
            alt="back"
            className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
          />
          <h5 className="text-[#222222] text-xl font-semibold">Bookings</h5>
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
                        Title
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Hosted By
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Owner Mobile No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Onwner Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Check In
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Check Out
                      </th>
                      <th scope="col" className="px-3 py-4">
                        No of Days
                      </th>
                      <th scope="col" className="px-3 py-4">
                        No of Guests
                      </th>
                      <th scope="col" className="px-6 py-4 uppercase">
                        Base Price
                      </th>
                      <th scope="col" className="px-8 py-4 uppercase">
                        Tax
                      </th>
                      <th scope="col" className="px-8 py-4 uppercase">
                        Total Price
                      </th>
                      <th scope="col" className="px-8 py-4 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingData?.map((booking, i, arr) => {
                      return (
                        <tr
                          key={i}
                          className={`border hover:bg-[#F9FAFF] hover:cursor-pointer rounded-md`}
                          onClick={() => {
                            navigate(`/rooms/${booking?.id}`);
                          }}
                        >
                          {/* sr.no  */}
                          <td className="px-6 py-4 w-[20px]">
                            <div className="flex felx-row gap-2 items-center">
                              {i + 1}
                            </div>
                          </td>
                          {/* images & title */}
                          <td className="px-6 py-4 flex flex-col items-start gap-2 w-[210px]">
                            <img
                              src={booking?.photos}
                              alt="Listing houses"
                              className="aspect-[16/10] object-cover w-32 rounded"
                            />
                            <p className="text-sm text-[#222222] font-semibold w-[200px] truncate">
                              {booking?.title}
                            </p>
                          </td>
                          {/* Location */}
                          <td className="px-4 py-2 w-[300px]">
                            <div className="flex felx-row gap-2 items-center">
                              {booking?.description?.slice(0, 50)}...
                            </div>
                          </td>
                          {/* instance book */}
                          <td className="px-6 py-4 w-[150px]">
                            {booking?.location?.addressLineOne},{" "}
                            {booking?.location?.addressLineTwo},{" "}
                            {booking?.location?.city?.name},{" "}
                            {booking?.location?.state?.name},{" "}
                            {booking?.location?.country?.name},{" "}
                          </td>
                          {/* Author Name */}
                          <td className="px-6 py-4 w-[100px]">
                            {booking?.hostedBy}
                          </td>
                          {/* Owner mobile number */}
                          <td className="px-6 py-4 w-[100px]">
                            {booking?.hostMobileNo}
                          </td>
                          {/* Owner Email */}
                          <td className="px-6 py-4 w-[100px]">
                            {booking?.hostEmail}
                          </td>
                          {/* Check In */}
                          <td className="px-6 py-4 w-[100px]">
                            {new Date(booking?.checkIn)
                              .toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(",", "")}
                          </td>
                          {/* Check Out  */}
                          <td className="px-6 py-4 w-[100px]">
                            {new Date(booking?.checkOut)
                              .toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(",", "")}
                          </td>
                          {/* Number of Nights / Days */}
                          <td className="px-6 py-4 w-[100px]">
                            {booking?.nightStaying}
                          </td>
                          {/* Number of guests */}
                          <td className="px-6 py-4 w-[100px]">
                            {booking?.guestNumber}
                          </td>
                          {/* Base Price */}
                          <td className="px-2 py-4 w-[200px]">
                            {booking?.basePrice}
                          </td>
                          {/* Tax*/}
                          <td className="px-6 py-4 max-w-[10px]">
                            {booking?.taxes}
                          </td>
                          {/* Total Price*/}
                          <td className="px-6 py-4 max-w-[10px]">
                            {booking?.totalPrice}
                          </td>
                          {/* Action */}
                          <td className="px-1 py-1 max-w-[10px]">
                            <div>
                              <PDFDownloadLink
                                document={
                                  <Document>
                                    <Page size="A4" style={styles.page}>
                                      <View style={styles.section}>
                                        <Text style={styles.title}>
                                          ApnaPG Receipt
                                        </Text>
                                        <Text>Title: {booking.title}</Text>
                                        <Text>
                                          Description: {booking.description}
                                        </Text>
                                        <Text>
                                          Location:{" "}
                                          {booking.location.addressLineOne},{" "}
                                          {booking.location.addressLineTwo},{" "}
                                          {booking.location.city.name},{" "}
                                          {booking.location.state.name},{" "}
                                          {booking.location.country.name}
                                        </Text>
                                        <Text>
                                          Hosted By: {booking.hostedBy}
                                        </Text>
                                        <Text>
                                          Owner Mobile No:{" "}
                                          {booking.hostMobileNo}
                                        </Text>
                                        <Text>
                                          Owner Email: {booking.hostEmail}
                                        </Text>
                                        <Text>
                                          Check In:{" "}
                                          {new Date(booking.checkIn)
                                            .toLocaleDateString("en-US", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })
                                            .replace(",", "")}
                                        </Text>
                                        <Text>
                                          Check Out:{" "}
                                          {new Date(booking.checkOut)
                                            .toLocaleDateString("en-US", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })
                                            .replace(",", "")}
                                        </Text>
                                        <Text>
                                          No of Days: {booking.nightStaying}
                                        </Text>
                                        <Text>
                                          No of Guests: {booking.guestNumber}
                                        </Text>
                                        <Text>
                                          Base Price: {booking.basePrice}
                                        </Text>
                                        <Text>Tax: {booking.taxes}</Text>
                                        <Text>
                                          Total Price: {booking.totalPrice}
                                        </Text>
                                      </View>
                                    </Page>
                                  </Document>
                                }
                                fileName="ApnaPG booking receipt.pdf"
                                style={{
                                  textDecoration: "none",
                                  padding: "10px",
                                  color: "#4a4a4a",
                                  backgroundColor: "#f2f2f2",
                                  border: "1px solid #4a4a4a",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  display: "inline-block",
                                }}
                              >
                                {({ blob, url, loading, error }) =>
                                  loading ? "Loading..." : "Download"
                                }
                              </PDFDownloadLink>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default Booking;
