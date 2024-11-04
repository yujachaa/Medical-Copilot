export default function ReportBtn() {
  return (
    <div className="flex-grow flex justify-end items-center gap-3 font-bold">
      <button className="outline outline-blue-btn text-blue-btn px-3 py-2 rounded-md hover:text-white hover:bg-blue-btn">
        Save
      </button>
      <button className="outline outline-save text-save hover:bg-save hover:text-white px-3 py-2 rounded-md">
        Export Report
      </button>
    </div>
  );
}
