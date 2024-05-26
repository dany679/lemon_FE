import { cn } from "@/lib/utils";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

type labelProps = { label: string; className?: string; image?: boolean };

const Empty = ({ label, image = false, className }: labelProps) => {
  return (
    <div className={cn("h-full p-20 flex flex-col items-center", className)}>
      {image && <ElectricBoltIcon className={"w-7 h-7"} />}
      <h4 className="text-muted-foreground text-sm text-center">{label}</h4>
    </div>
  );
};

export default Empty;
