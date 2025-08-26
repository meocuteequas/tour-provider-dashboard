"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const MonthlyBookingChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-08");

  // Dữ liệu mẫu cho các tháng khác nhau
  const monthlyData = {
    "2025-08": [
      { day: "1", bookings: 15 }, { day: "2", bookings: 8 }, { day: "3", bookings: 22 }, { day: "4", bookings: 12 }, { day: "5", bookings: 18 },
      { day: "6", bookings: 25 }, { day: "7", bookings: 30 }, { day: "8", bookings: 14 }, { day: "9", bookings: 19 }, { day: "10", bookings: 16 },
      { day: "11", bookings: 21 }, { day: "12", bookings: 28 }, { day: "13", bookings: 17 }, { day: "14", bookings: 23 }, { day: "15", bookings: 26 },
      { day: "16", bookings: 20 }, { day: "17", bookings: 24 }, { day: "18", bookings: 13 }, { day: "19", bookings: 27 }, { day: "20", bookings: 31 },
      { day: "21", bookings: 18 }, { day: "22", bookings: 22 }, { day: "23", bookings: 16 }, { day: "24", bookings: 29 }, { day: "25", bookings: 25 },
      { day: "26", bookings: 19 }, { day: "27", bookings: 21 }, { day: "28", bookings: 15 }, { day: "29", bookings: 23 }, { day: "30", bookings: 28 },
      { day: "31", bookings: 24 }
    ],
    "2025-07": [
      { day: "1", bookings: 12 }, { day: "2", bookings: 18 }, { day: "3", bookings: 15 }, { day: "4", bookings: 22 }, { day: "5", bookings: 19 },
      { day: "6", bookings: 28 }, { day: "7", bookings: 24 }, { day: "8", bookings: 16 }, { day: "9", bookings: 20 }, { day: "10", bookings: 17 },
      { day: "11", bookings: 25 }, { day: "12", bookings: 21 }, { day: "13", bookings: 14 }, { day: "14", bookings: 26 }, { day: "15", bookings: 23 },
      { day: "16", bookings: 18 }, { day: "17", bookings: 20 }, { day: "18", bookings: 15 }, { day: "19", bookings: 24 }, { day: "20", bookings: 27 },
      { day: "21", bookings: 19 }, { day: "22", bookings: 22 }, { day: "23", bookings: 16 }, { day: "24", bookings: 25 }, { day: "25", bookings: 21 },
      { day: "26", bookings: 17 }, { day: "27", bookings: 23 }, { day: "28", bookings: 20 }, { day: "29", bookings: 26 }, { day: "30", bookings: 24 },
      { day: "31", bookings: 18 }
    ],
    "2025-06": [
      { day: "1", bookings: 10 }, { day: "2", bookings: 14 }, { day: "3", bookings: 18 }, { day: "4", bookings: 12 }, { day: "5", bookings: 16 },
      { day: "6", bookings: 20 }, { day: "7", bookings: 22 }, { day: "8", bookings: 11 }, { day: "9", bookings: 15 }, { day: "10", bookings: 13 },
      { day: "11", bookings: 17 }, { day: "12", bookings: 19 }, { day: "13", bookings: 14 }, { day: "14", bookings: 21 }, { day: "15", bookings: 18 },
      { day: "16", bookings: 16 }, { day: "17", bookings: 20 }, { day: "18", bookings: 12 }, { day: "19", bookings: 23 }, { day: "20", bookings: 25 },
      { day: "21", bookings: 17 }, { day: "22", bookings: 19 }, { day: "23", bookings: 15 }, { day: "24", bookings: 24 }, { day: "25", bookings: 21 },
      { day: "26", bookings: 18 }, { day: "27", bookings: 22 }, { day: "28", bookings: 16 }, { day: "29", bookings: 20 }, { day: "30", bookings: 24 }
    ],
  };

  const currentData = monthlyData[selectedMonth as keyof typeof monthlyData] || [];

  const months = [
    { value: "2025-08", label: "Tháng 8 - 2025" },
    { value: "2025-07", label: "Tháng 7 - 2025" },
    { value: "2025-06", label: "Tháng 6 - 2025" },
  ];

  // Chart configuration
  const chartConfig = {
    bookings: {
      label: "Số lượng đặt tour",
      color: "hsl(var(--chart-1))",
    },
    trend: {
      label: "Xu hướng",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-900">
            Biểu Đồ Đặt Tour Theo Tháng
          </CardTitle>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ComposedChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => [
                    `${value} đặt tour`,
                    name === "bookings" ? "Số lượng đặt tour" : "Xu hướng"
                  ]}
                  labelFormatter={(label) => `Ngày ${label}`}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="bookings"
              fill="var(--color-bookings)"
              radius={[4, 4, 0, 0]}
              name="Số lượng đặt tour"
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="var(--color-trend)"
              strokeWidth={3}
              dot={{ fill: "var(--color-trend)", strokeWidth: 2, r: 4 }}
              name="Xu hướng"
            />
          </ComposedChart>
        </ChartContainer>
        
        {/* Thống kê */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <div className="text-base text-gray-600">
            <span className="font-medium">Tổng đặt tour:</span> {currentData.reduce((sum, item) => sum + item.bookings, 0)}
          </div>
          <div className="text-base text-gray-600">
            <span className="font-medium">Trung bình/ngày:</span> {Math.round(currentData.reduce((sum, item) => sum + item.bookings, 0) / currentData.length)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyBookingChart;
