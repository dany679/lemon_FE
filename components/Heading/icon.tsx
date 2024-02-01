import { cn } from "@/lib/utils";
import { IconComponent } from "@/utils/constants";
import { ReactElement } from "react";

interface IconTypeProps {
  width: number;
  height: number;
  color: string;
}
interface HeadingIconProps {
  Icon?: IconComponent;
  iconColor: string;
  MaterialIcon?: ReactElement;
  bgColor?: string;
}

const HeadingIcon = ({
  Icon,
  iconColor,
  bgColor,
  MaterialIcon,
}: HeadingIconProps) => {

  return (
    <div className={cn("p-2 w-fit rounded-md", bgColor)}>
      <div className="[&>*]:w-10 [&>*]:h-10 mb-2">
        {Icon && <Icon className={cn("w-10 h-10", iconColor)} />}
      </div>
    </div>
  );
};

export default HeadingIcon;
