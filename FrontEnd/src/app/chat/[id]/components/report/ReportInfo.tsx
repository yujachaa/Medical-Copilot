type ReportInfoProps = {
  id: string;
  date: Date;
};

export default function ReportInfo({ id, date }: ReportInfoProps) {
  return (
    <div className="flex justify-center items-start gap-3">
      <div>
        <div className="text-[14px] font-bold">Report ID</div>
        <div className="bg-blue-base rounded-md  p-1">{id}</div>
      </div>
      <div>
        <div className="text-[14px] font-bold">Date</div>
        <div className="bg-blue-base rounded-md p-1">{date.toLocaleDateString()}</div>
      </div>
    </div>
  );
}
