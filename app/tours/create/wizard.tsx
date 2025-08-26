"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Upload, MapPin, DollarSign, Users } from "lucide-react";
import { Editor } from "@/components/blocks/editor-00/editor";
import { SerializedEditorState } from "lexical";

interface TourData {
  // Thông tin cơ bản
  name: string;
  shortDescription: string;
  location: string;

  // Hình ảnh
  images: string[];

  // Chi tiết tour
  duration: string;
  maxGuests: number;
  difficulty: string;
  category: string;

  // Giá cả
  price: number;
  currency: string;
  availability: string;

  // Mô tả chi tiết
  detailedDescription: string;
  detailedDescriptionEditor: SerializedEditorState;
  included: string[];
  excluded: string[];
  requirements: string[];
}

const initialEditorState = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Mô tả chi tiết về tour của bạn...",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

const initialTourData: TourData = {
  name: "",
  shortDescription: "",
  location: "",
  images: [],
  duration: "",
  maxGuests: 1,
  difficulty: "",
  category: "",
  price: 0,
  currency: "USD",
  availability: "",
  detailedDescription: "",
  detailedDescriptionEditor: initialEditorState,
  included: [],
  excluded: [],
  requirements: [],
};

interface Section {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
}

export default function CreateTourWizard() {
  const [tourData, setTourData] = useState<TourData>(initialTourData);
  const sections: Section[] = [
    {
      id: "basic-info",
      title: "Thông tin cơ bản và tags",
      description: "Tên tour, mô tả ngắn và địa điểm. Thông tin này sẽ hiển thị trên danh sách tour.",
      isRequired: true,
    },
    {
      id: "images",
      title: "Hình ảnh tour",
      description: "Tải lên hình ảnh chất lượng cao để thu hút khách hàng. Cần ít nhất 6 hình ảnh.",
      isRequired: true,
    },
    {
      id: "details",
      title: "Chi tiết tour và cấu hình",
      description: "Thời gian, số lượng khách, độ khó và phân loại tour.",
      isRequired: true,
    },
    {
      id: "pricing",
      title: "Giá cả và tính khả dụng",
      description: "Thiết lập giá tour và lịch trình khả dụng.",
      isRequired: true,
    },
    {
      id: "description",
      title: "Mô tả chi tiết",
      description: "Thông tin đầy đủ về tour, bao gồm và không bao gồm, yêu cầu.",
      isRequired: true,
    },
  ];

  // Helper function to extract text from editor state
  const extractTextFromEditor = (editorState: SerializedEditorState): string => {
    try {
      if (!editorState?.root?.children) return "";
      
      let text = "";
      const traverse = (node: { type?: string; text?: string; children?: unknown[] }) => {
        if (node.type === "text" && node.text) {
          text += node.text + " ";
        } else if (node.children) {
          node.children.forEach((child) => traverse(child as { type?: string; text?: string; children?: unknown[] }));
        }
      };
      
      editorState.root.children.forEach((child) => traverse(child as { type?: string; text?: string; children?: unknown[] }));
      return text.trim();
    } catch {
      return "";
    }
  };

  const updateTourData = (field: keyof TourData, value: string | number | string[] | SerializedEditorState) => {
    setTourData((prev) => ({ ...prev, [field]: value }));
  };

  const isSectionValid = (sectionId: string) => {
    switch (sectionId) {
      case "basic-info":
        return tourData.name.length >= 6 && tourData.shortDescription.length >= 20 && tourData.location.length >= 3;
      case "images":
        return tourData.images.length >= 6;
      case "details":
        return tourData.duration && tourData.maxGuests > 0 && tourData.difficulty && tourData.category;
      case "pricing":
        return tourData.price > 0 && tourData.availability;
      case "description":
        // For now, just check if we have some editor content or fallback description
        return tourData.detailedDescription.length >= 50 || tourData.detailedDescriptionEditor !== initialEditorState;
      default:
        return false;
    }
  };

  const renderSectionTrigger = (section: Section) => {

    return (
      <div className="flex items-center space-x-3 flex-1">
        <div className="text-left flex-1">
          <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
          <p className="text-base text-gray-600">{section.description}</p>
        </div>
      </div>
    );
  };

  const renderBasicInfoSection = () => (
    <div className="p-4 space-y-6">
      <div>
        <Label htmlFor="tourName" className="text-base font-medium text-gray-900">
          Tên <span className="text-red-500">*</span>
        </Label>
        <Input
          id="tourName"
          placeholder="Ví dụ: Khám Phá Thành Phố Tokyo - Hành Trình Qua Văn Hóa Nhật Bản"
          value={tourData.name}
          onChange={(e) => updateTourData("name", e.target.value)}
          className="mt-2 text-base min-h-[48px]"
        />
        <p className="text-base text-gray-500 mt-1">Tên tour phải có ít nhất 6 ký tự ({tourData.name.length}/6)</p>
      </div>

      <div>
        <Label htmlFor="shortDesc" className="text-base font-medium text-gray-900">
          Mô tả ngắn <span className="text-red-500">*</span>
        </Label>
        <textarea
          id="shortDesc"
          placeholder="Mô tả ngắn gọn về tour của bạn, nổi bật những điểm thu hút chính..."
          value={tourData.shortDescription}
          onChange={(e) => updateTourData("shortDescription", e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[96px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
        <p className="text-base text-gray-500 mt-1">
          Mô tả ngắn phải có ít nhất 20 ký tự ({tourData.shortDescription.length}/20)
        </p>
      </div>

      <div>
        <Label htmlFor="location" className="text-base font-medium text-gray-900">
          Địa điểm <span className="text-red-500">*</span>
        </Label>
        <div className="relative mt-2">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="location"
            placeholder="Ví dụ: Tokyo, Nhật Bản"
            value={tourData.location}
            onChange={(e) => updateTourData("location", e.target.value)}
            className="pl-10 text-base min-h-[48px]"
          />
        </div>
        <p className="text-base text-gray-500 mt-1">Địa điểm phải có ít nhất 3 ký tự ({tourData.location.length}/3)</p>
      </div>

      <Button variant="outline" className="text-base">
        Thêm tags bổ sung
      </Button>
    </div>
  );

  const renderImagesSection = () => (
    <div className="p-6 space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tải lên hình ảnh</h3>
        <p className="text-gray-500 mb-4 text-base">Chọn hoặc kéo thả tệp hình ảnh vào đây</p>
        <Button variant="outline" className="text-base min-h-[48px]">
          Duyệt tệp
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
          >
            <div className="text-center text-gray-500">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p className="text-base">Hình {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2 text-base">💡 Lời khuyên cho hình ảnh chất lượng:</h4>
        <ul className="text-blue-800 text-base space-y-1">
          <li>• Sử dụng độ phân giải cao (ít nhất 1200x800 pixels)</li>
          <li>• Bao gồm các góc nhìn khác nhau của địa điểm</li>
          <li>• Hiển thị những điểm nổi bật của tour</li>
          <li>• Đảm bảo hình ảnh sáng và rõ nét</li>
        </ul>
      </div>

      <div className="text-base text-gray-600">
        <strong>Tiến độ:</strong> {tourData.images.length}/6 hình ảnh đã tải lên
      </div>
    </div>
  );

  const renderDetailsSection = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="duration" className="text-base font-medium text-gray-900">
            Thời gian tour <span className="text-red-500">*</span>
          </Label>
          <select
            id="duration"
            value={tourData.duration}
            onChange={(e) => updateTourData("duration", e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[48px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Chọn thời gian</option>
            <option value="2-3 giờ">2-3 giờ</option>
            <option value="4-5 giờ">4-5 giờ</option>
            <option value="6-7 giờ">6-7 giờ</option>
            <option value="8+ giờ">8+ giờ</option>
            <option value="Cả ngày">Cả ngày</option>
            <option value="2-3 ngày">2-3 ngày</option>
            <option value="1 tuần">1 tuần</option>
          </select>
        </div>

        <div>
          <Label htmlFor="maxGuests" className="text-base font-medium text-gray-900">
            Số khách tối đa <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-2">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="maxGuests"
              type="number"
              min="1"
              max="50"
              value={tourData.maxGuests}
              onChange={(e) => updateTourData("maxGuests", parseInt(e.target.value) || 1)}
              className="pl-10 text-base min-h-[48px]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="difficulty" className="text-base font-medium text-gray-900">
            Độ khó <span className="text-red-500">*</span>
          </Label>
          <select
            id="difficulty"
            value={tourData.difficulty}
            onChange={(e) => updateTourData("difficulty", e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[48px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Chọn độ khó</option>
            <option value="Dễ">Dễ - Phù hợp cho mọi lứa tuổi</option>
            <option value="Trung bình">Trung bình - Cần thể lực cơ bản</option>
            <option value="Khó">Khó - Cần thể lực tốt</option>
            <option value="Rất khó">Rất khó - Chỉ dành cho người có kinh nghiệm</option>
          </select>
        </div>

        <div>
          <Label htmlFor="category" className="text-base font-medium text-gray-900">
            Loại tour <span className="text-red-500">*</span>
          </Label>
          <select
            id="category"
            value={tourData.category}
            onChange={(e) => updateTourData("category", e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[48px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Chọn loại tour</option>
            <option value="Văn hóa & Lịch sử">Văn hóa & Lịch sử</option>
            <option value="Ẩm thực">Ẩm thực</option>
            <option value="Thiên nhiên">Thiên nhiên</option>
            <option value="Phiêu lưu">Phiêu lưu</option>
            <option value="Thành phố">Thành phố</option>
            <option value="Nghệ thuật">Nghệ thuật</option>
            <option value="Thể thao">Thể thao</option>
            <option value="Gia đình">Gia đình</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-base text-gray-600">
          <strong>ℹ️ Lưu ý:</strong> Thông tin này sẽ giúp khách hàng tìm hiểu về mức độ phù hợp và chuẩn bị cho tour
          của bạn.
        </p>
      </div>
    </div>
  );

  const renderPricingSection = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="price" className="text-base font-medium text-gray-900">
            Giá tour (mỗi người) <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-2">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="price"
              type="number"
              min="1"
              value={tourData.price}
              onChange={(e) => updateTourData("price", parseFloat(e.target.value) || 0)}
              className="pl-10 text-base min-h-[48px]"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="currency" className="text-base font-medium text-gray-900">
            Loại tiền tệ
          </Label>
          <select
            id="currency"
            value={tourData.currency}
            onChange={(e) => updateTourData("currency", e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[48px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD - Đô la Mỹ</option>
            <option value="VND">VND - Việt Nam Đồng</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - Bảng Anh</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="availability" className="text-base font-medium text-gray-900">
          Tính khả dụng <span className="text-red-500">*</span>
        </Label>
        <select
          id="availability"
          value={tourData.availability}
          onChange={(e) => updateTourData("availability", e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[48px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Chọn tính khả dụng</option>
          <option value="Hàng ngày">Hàng ngày</option>
          <option value="Cuối tuần">Chỉ cuối tuần</option>
          <option value="Theo lịch trình">Theo lịch trình cụ thể</option>
          <option value="Theo yêu cầu">Theo yêu cầu</option>
        </select>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2 text-base">💰 Tóm tắt giá:</h4>
        <div className="text-green-800">
          <p className="text-lg font-bold">
            {tourData.price > 0 ? `${tourData.price} ${tourData.currency}` : "Chưa thiết lập"} / người
          </p>
          <p className="text-base">
            Tối đa {tourData.maxGuests} khách = {(tourData.price * tourData.maxGuests).toLocaleString()}{" "}
            {tourData.currency} / tour
          </p>
        </div>
      </div>

      <Button variant="outline" className="text-base">
        Thêm nhiều tùy chọn giá
      </Button>
    </div>
  );

  const renderDescriptionSection = () => (
    <div className="p-6 space-y-6">
      <div>
        <Label htmlFor="detailedDesc" className="text-base font-medium text-gray-900">
          Mô tả chi tiết <span className="text-red-500">*</span>
        </Label>
        <div className="mt-2">
          <Editor
            editorSerializedState={tourData.detailedDescriptionEditor}
            onSerializedChange={(value) => updateTourData("detailedDescriptionEditor", value)}
          />
        </div>
        <p className="text-base text-gray-500 mt-1">
          Sử dụng trình soạn thảo để tạo mô tả chi tiết và hấp dẫn cho tour của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label className="text-base font-medium text-gray-900">Bao gồm trong tour</Label>
          <textarea
            placeholder="Ví dụ: Hướng dẫn viên chuyên nghiệp, Vé tham quan, Đồ uống..."
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[96px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        <div>
          <Label className="text-base font-medium text-gray-900">Không bao gồm</Label>
          <textarea
            placeholder="Ví dụ: Chi phí cá nhân, Bảo hiểm du lịch, Tiền tip..."
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[96px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        <div>
          <Label className="text-base font-medium text-gray-900">Yêu cầu & lưu ý</Label>
          <textarea
            placeholder="Ví dụ: Giày đi bộ thoải mái, Mang theo nước uống, Không phù hợp cho người khuyết tật..."
            className="mt-2 w-full p-3 border border-gray-300 rounded-md text-base min-h-[96px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case "basic-info":
        return renderBasicInfoSection();
      case "images":
        return renderImagesSection();
      case "details":
        return renderDetailsSection();
      case "pricing":
        return renderPricingSection();
      case "description":
        return renderDescriptionSection();
      default:
        return null;
    }
  };

  const allSectionsValid = sections.every((section) => isSectionValid(section.id));

  const handleCreateTour = () => {
    if (allSectionsValid) {
      alert("🎉 Tour đã được tạo thành công! (UI Only - chưa lưu vào database)");
      console.log("Tour Data:", tourData);
    }
  };

  return (
    <div className="flex space-x-6">
      <div className="space-y-6 flex-1">
        <Accordion
          type="multiple"
          defaultValue={["basic-info", "images", "details", "pricing", "description"]}
          className="space-y-4"
        >
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                {renderSectionTrigger(section)}
              </AccordionTrigger>
              <AccordionContent className="pb-0">{renderSectionContent(section.id)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="min-w-[400px]">
        <div className="sticky top-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Xem trước tour</h3>
              <p className="text-base text-gray-600 mt-1">Đây là cách tour của bạn sẽ hiển thị với khách hàng</p>
            </div>

            <div className="p-4 space-y-4">
              {/* Tour Name & Location */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {tourData.name || "Tên tour sẽ hiển thị ở đây"}
                </h4>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-base">{tourData.location || "Địa điểm"}</span>
                </div>
                <p className="text-gray-700 text-base">
                  {tourData.shortDescription || "Mô tả ngắn về tour sẽ hiển thị ở đây để thu hút khách hàng..."}
                </p>
              </div>

              {/* Image Preview */}
              <div>
                <div className="aspect-video bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                  {tourData.images.length > 0 ? (
                    <div className="text-center text-gray-600">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-base">{tourData.images.length} hình ảnh</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-base">Hình ảnh chính</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tour Details */}
              <div className="grid grid-cols-2 gap-3 text-base">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">Thời gian</div>
                  <div className="text-gray-600">{tourData.duration || "Chưa chọn"}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">Số khách</div>
                  <div className="text-gray-600">Tối đa {tourData.maxGuests} người</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">Độ khó</div>
                  <div className="text-gray-600">{tourData.difficulty || "Chưa chọn"}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">Loại tour</div>
                  <div className="text-gray-600">{tourData.category || "Chưa chọn"}</div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {tourData.price > 0 ? `${tourData.price.toLocaleString()} ${tourData.currency}` : "Chưa có giá"}
                  </div>
                  <div className="text-base text-orange-700">mỗi người</div>
                  {tourData.availability && (
                    <div className="text-base text-orange-600 mt-1">{tourData.availability}</div>
                  )}
                </div>
              </div>

              {/* Description Preview */}
              {(() => {
                const editorText = extractTextFromEditor(tourData.detailedDescriptionEditor);
                const displayText = editorText || tourData.detailedDescription;
                return displayText && displayText !== "Mô tả chi tiết về tour của bạn..." && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Mô tả chi tiết</h5>
                    <div className="text-base text-gray-700 bg-gray-50 p-3 rounded border max-h-24 overflow-y-auto">
                      {displayText.length > 150 
                        ? `${displayText.substring(0, 150)}...` 
                        : displayText
                      }
                    </div>
                  </div>
                );
              })()}

              {/* Quick Stats */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="font-medium text-blue-900 mb-2 text-base">📊 Thống kê nhanh</h5>
                <div className="grid grid-cols-2 gap-2 text-base">
                  <div>
                    <span className="text-blue-700">Tên tour:</span>
                    <span className="text-blue-600 ml-1">{tourData.name.length}/6+ ký tự</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Hình ảnh:</span>
                    <span className="text-blue-600 ml-1">{tourData.images.length}/6 ảnh</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Mô tả ngắn:</span>
                    <span className="text-blue-600 ml-1">{tourData.shortDescription.length}/20+ ký tự</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Mô tả chi tiết:</span>
                    <span className="text-blue-600 ml-1">
                      {(() => {
                        const editorText = extractTextFromEditor(tourData.detailedDescriptionEditor);
                        const textLength = editorText.length || tourData.detailedDescription.length;
                        return `${textLength}/50+ ký tự`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Completion Status */}
              <div className="border-t border-gray-200 pt-4">
                <h5 className="font-medium text-gray-900 mb-3">Tiến độ hoàn thành</h5>
                <div className="space-y-2">
                  {sections.map((section) => {
                    const isValid = isSectionValid(section.id);
                    return (
                      <div key={section.id} className="flex items-center justify-between">
                        <span className="text-base text-gray-600">{section.title}</span>
                        <div className={`w-4 h-4 rounded-full ${isValid ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {isValid && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(sections.filter(s => isSectionValid(s.id)).length / sections.length) * 100}%` 
                    }}
                  ></div>
                </div>
                
                <div className="text-center mt-2 text-base text-gray-600">
                  {sections.filter(s => isSectionValid(s.id)).length} / {sections.length} phần hoàn thành
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full text-base"
                  disabled={sections.filter(s => isSectionValid(s.id)).length === 0}
                >
                  Xem trước đầy đủ
                </Button>
                
                <Button 
                  onClick={handleCreateTour}
                  disabled={!allSectionsValid}
                  className="w-full text-base bg-orange-500 hover:bg-orange-600"
                >
                  {allSectionsValid ? "Tạo tour ngay" : "Hoàn thành tất cả để tạo tour"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
