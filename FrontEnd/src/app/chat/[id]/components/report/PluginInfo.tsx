type PluginInfoProps = {
  type: string;
};

export default function PluginInfo({ type }: PluginInfoProps) {
  return (
    <div className="flex px-[10] py-[5] justify-center items-center bg-blue-base rounded-full text-blue-btn text-sm">
      Plugin : {type}
    </div>
  );
}
