const { createMailTransporter } = require("./createMailTransporter");

const sendRoomBookingInvoice = async (
  user,
  listingDetails,
  guestNumber,
  checkIn,
  checkOut,
  nightStaying,
  orderId,
  basePrice,
  tax,
  totalPaid,
  totalBase,
  totalTax
) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"ApnaPG" pravin.mhaske@apnapg.com ',
    to: user.emailId,
    subject: "Your booking invoice from ApnaPG",
    html: `
       
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Airbnb Room Booking Invoice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .main {
        background-color: #f2f2f2;
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
        width: 80%;
        margin: 20px auto;
        padding: 10px;
      }
      .container {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
      }
      .invoice-details h2 {
        margin-top: 0;
        color: #333;
        font-size: 20px;
      }
      .invoice-details p {
        margin: 5px 0;
        color: #555;
        font-size: 16px;
      }
      .invoice-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .invoice-table th,
      .invoice-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        font-size: 16px;
      }
      .invoice-table th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      .invoice-table tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      .total {
        text-align: right;
        font-size: 16px;
        border-top: 1px solid #ddd;
        padding-top: 10px;
      }
      .total span {
        font-weight: bold;
      }
      .guest-info p,
      .payment-method p,
      .closing-msg p {
        font-size: 16px;
        margin: 5px 0;
      }
      .payment-method p a {
        color: #b0b0b0;
        text-decoration: none;
      }
      .payment-method p a:hover {
        color: #ff0000;
        text-decoration: underline;
      }
      .flex-container {
        display: flex;
        justify-content: space-between;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="container">
        <div class="invoice-details">
          <h2>ApnaPG</h2>
          <p>Hello, <span id="guestName">${user?.name?.firstName} ${
      user?.name?.lastName
    }</span></p>
          <p>Thank you for booking the room at ApnaPG.</p>
        </div>
        <div class="invoice-details">
          <p>Order ID: ${orderId}</p>
          <p>Date: ${new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</p>
        </div>
      </div>
      <div class="container">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Name of Room</th>
              <th>Room Type</th>
              <th>Location</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Guest</th>
              <th>Total Days/Nights</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${listingDetails.title}</td>
              <td>${listingDetails.roomType}</td>
              <td>${listingDetails?.location?.addressLineOne},
              ${listingDetails?.location?.addressLineTwo},
              ${listingDetails?.location?.city?.name},
              ${listingDetails?.location?.state?.name},
              ${listingDetails?.location?.country?.name}
              </td>
              <td>${new Date(checkIn)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")}</td>
              <td>${new Date(checkOut)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(",", "")}</td>
              <td>${guestNumber}</td>
              <td>${nightStaying}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container">
        <div class="total">
          <p>Base Price : <span>INR ${basePrice}</span></p>
          <p>Guest count   : <span>${guestNumber}</span></p>
          <p>Total Days Stay     : <span> ${nightStaying}</span></p>
          <p>Total amount paid    : <span>INR ${totalBase}</span></p>
        </div>
      </div>
      <div class="container">
        <div class="flex-container">
          <div class="guest-info">
            <p><strong>Guest Information</strong></p>
            <p>Name: ${user?.name?.firstName} ${user?.name?.lastName}</p>
            <p>Email: ${user?.emailId}</p>
            <p>Phone: ${user?.mobileNo}</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="closing-msg">
          <p>Have a nice day.</p>
        </div>
      </div>
    </div>
  </body>
</html>

    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Room booking invoice send successfully" + info.response);
    }
  });
};

module.exports = { sendRoomBookingInvoice };
