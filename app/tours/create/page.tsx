import CreateTourWizard from "./wizard";

export default async function CreateTourPage() {

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tạo Tour Mới</h1>
        <p className="text-gray-600 mt-2 text-lg">Tạo trải nghiệm du lịch tuyệt vời theo từng bước</p>
      </div>
      <CreateTourWizard />
    </main>
  );
}
