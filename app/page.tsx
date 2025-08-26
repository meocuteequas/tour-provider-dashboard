import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyBookingChart from "@/components/monthly-booking-chart";

export default async function Home() {
  // Dữ liệu mẫu - sẽ thay thế bằng truy vấn cơ sở dữ liệu thực tế sau
  const stats = {
    bookingsToday: 12,
    toursGoingToday: 5,
    canceledToday: 2,
    revenueToday: 24500000
  };

  return (
    <main className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bảng Điều Khiển</h1>
        <p className="text-gray-600 mt-2">Tổng quan thống kê tour hôm nay</p>
      </div>

      {/* Thẻ Thống Kê */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Đặt Tour Hôm Nay */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-blue-600">
              Đặt Tour Hôm Nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">
              {stats.bookingsToday}
            </div>
            <p className="text-base text-blue-600 mt-1">
              Đặt tour mới nhận được
            </p>
          </CardContent>
        </Card>

        {/* Tour Diễn Ra Hôm Nay */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-green-600">
              Tour Diễn Ra Hôm Nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">
              {stats.toursGoingToday}
            </div>
            <p className="text-base text-green-600 mt-1">
              Tour hoạt động đã lên lịch
            </p>
          </CardContent>
        </Card>

        {/* Hủy Hôm Nay */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-red-600">
              Hủy Hôm Nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900">
              {stats.canceledToday}
            </div>
            <p className="text-base text-red-600 mt-1">
              Tour bị hủy
            </p>
          </CardContent>
        </Card>

        {/* Tổng Doanh Thu Hôm Nay */}
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-purple-600">
              Doanh Thu Hôm Nay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">
              {stats.revenueToday.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
            </div>
            <p className="text-base text-purple-600 mt-1">
              Tổng thu nhập hôm nay
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Biểu Đồ Đặt Tour Theo Tháng */}
      <div className="mb-8">
        <MonthlyBookingChart />
      </div>
    </main>
  );
}