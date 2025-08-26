
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockTours = [
  {
    id: 1,
    name: "Khám Phá Thành Phố Tokyo - Hành Trình Qua Văn Hóa Nhật Bản Hiện Đại",
    description: "Khám phá những con phố sôi động của Tokyo cùng hướng dẫn viên địa phương chuyên nghiệp. Trải nghiệm văn hóa độc đáo từ khu phố cổ Asakusa đến quận Shibuya hiện đại, thưởng thức ẩm thực truyền thống và tìm hiểu lịch sử phong phú của thủ đô Nhật Bản.",
    duration: "8 giờ",
    maxGuests: 12,
    price: 89,
    status: "active",
    location: "Tokyo, Nhật Bản",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1000&h=1000&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Dạo Bước Lịch Sử Paris - Khám Phá Thành Phố Ánh Sáng",
    description: "Đi bộ qua nhiều thế kỷ lịch sử và văn hóa Paris với những câu chuyện hấp dẫn về các di tích nổi tiếng. Từ tháp Eiffel hùng vĩ đến bảo tàng Louvre danh tiếng, khám phá những bí mật ẩn giấu trong từng con phố cổ kính và thưởng thức không khí lãng mạn đặc trưng của thủ đô nước Pháp.",
    duration: "6 giờ",
    maxGuests: 15,
    price: 75,
    status: "active",
    location: "Paris, Pháp",
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=1000&h=1000&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Phiêu Lưu Ẩm Thực Bangkok - Hành Trình Khám Phá Hương Vị Thái Lan",
    description: "Thưởng thức món ăn Thái chính thống từ đồ ăn đường phố đến nhà hàng cao cấp trong một cuộc phiêu lưu ẩm thực đầy thú vị. Khám phá các khu chợ địa phương, học cách chế biến món ăn truyền thống và trải nghiệm hương vị đa dạng của ẩm thực Thái Lan cùng những câu chuyện văn hóa độc đáo.",
    duration: "5 giờ",
    maxGuests: 8,
    price: 65,
    status: "draft",
    location: "Bangkok, Thái Lan",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1000&h=1000&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "Nghệ Thuật & Văn Hóa New York - Trung Tâm Sáng Tạo Thế Giới",
    description: "Khám phá bảo tàng, phòng trưng bày và các địa danh văn hóa nổi tiếng nhất của New York. Từ Metropolitan Museum of Art đến MoMA, từ Broadway đến Greenwich Village, trải nghiệm sự đa dạng nghệ thuật và văn hóa của thành phố không ngủ với những câu chuyện hấp dẫn về lịch sử và sự phát triển của nghệ thuật hiện đại.",
    duration: "7 giờ",
    maxGuests: 10,
    price: 95,
    status: "active",
    location: "New York, Mỹ",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000&h=1000&fit=crop&crop=center",
  },
  {
    id: 5,
    name: "Di Sản Hoàng Gia London - Hành Trình Qua Lịch Sử Hoàng Gia Anh",
    description: "Tham quan cung điện, lâu đài và tìm hiểu về hoàng gia Anh qua nhiều thế kỷ lịch sử huy hoàng. Khám phá Cung điện Buckingham, Tháp London, và Westminster Abbey với những câu chuyện thú vị về các vị vua và hoàng hậu nổi tiếng. Trải nghiệm truyền thống văn hóa Anh và tìm hiểu về vai trò của hoàng gia trong xã hội hiện đại.",
    duration: "9 giờ",
    maxGuests: 20,
    price: 110,
    status: "inactive",
    location: "London, Anh",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&h=1000&fit=crop&crop=center",
  },
];
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Hoạt động</Badge>;
    case "inactive":
      return <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600">Không hoạt động</Badge>;
    case "draft":
      return <Badge variant="outline" className="border-orange-500 text-orange-600">Bản nháp</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default async function Tours() {
  return (
    <main>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bảng Điều Khiển Tour</h1>
          <p className="text-muted-foreground mt-2">Quản lý các tour du lịch và tạo trải nghiệm mới</p>
        </div>
        <Button asChild>
          <Link href="/tours/create">
            <Plus className="mr-2 h-4 w-4" />
            Tạo Tour
          </Link>
        </Button>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-lg shadow-sm border">
          <Table className="w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%] text-lg font-bold p-6">Hình ảnh</TableHead>
                <TableHead className="w-[60%] text-lg font-bold p-6">Chi tiết Tour</TableHead>
                <TableHead className="w-[10%] text-right text-lg font-bold p-6">Giá</TableHead>
                <TableHead className="w-[10%] text-center text-lg font-bold p-6">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTours.map((tour) => (
                <TableRow key={tour.id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="p-6 w-[20%]">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="p-6 w-[60%] min-w-0">
                    <div className="space-y-3 min-w-0">
                      <h3 className="font-bold text-xl text-gray-900 leading-tight">{tour.name}</h3>
                      <p className="text-gray-600 text-base leading-relaxed w-full bg-red-50 text-ellipsis whitespace-normal">{tour.description}</p>
                      <div className="flex items-center gap-6 text-gray-500 pt-2 flex-wrap">
                        <span className="break-words">📍 {tour.location}</span>
                        <span className="break-words">⏱️ {tour.duration}</span>
                        <span className="break-words">👥 Tối đa {tour.maxGuests} khách</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-right w-[10%]">
                    <div className="font-semibold text-xl text-gray-900">${tour.price}</div>
                    <div className=" text-gray-500">mỗi người</div>
                  </TableCell>
                  <TableCell className="p-6 text-center w-[10%]">
                    {getStatusBadge(tour.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

      </div>
    </main>
  );
}