import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const yAxisData = (value) => `₹ ${value}`;

const Charts = ({ reservations }) => {
  console.log("The reservations in the charts ", reservations);
  const [monthlyEarnings, setMonthlyEarnings] = useState(Array(12)?.fill(0));

  useEffect(() => {
    if (reservations) {
      const currentYear = new Date().getFullYear();

      const filteredReservations = reservations.filter((obj) => {
        const checkInDate = new Date(obj.checkIn);
        return checkInDate.getFullYear() === currentYear;
      });

      const updatedEarnings = Array(12).fill(0);

      filteredReservations.forEach((obj) => {
        const checkInDate = new Date(obj.checkIn);
        const month = checkInDate.getMonth();
        updatedEarnings[month] += obj.totalBase;
      });
      setMonthlyEarnings(updatedEarnings);
    }
  }, [reservations]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const resultArray = months.map((month, index) => ({
    name: month,
    earned: monthlyEarnings[index],
  }));

  return (
    <ResponsiveContainer width={"100%"}>
      <BarChart data={resultArray}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={yAxisData} />
        <Tooltip />
        <Bar dataKey="earned" fill="#ff3f62ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
