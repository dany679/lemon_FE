import { cn } from "@/lib/utils";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LightModeIcon from "@mui/icons-material/LightMode";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { Icon, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
interface ChartCardProps {
  type: "local" | "lightEconomic" | "light" | "total" | "moneyEconomic";
  value: string | number | null;
  isLoading?: boolean;
}

const Cards = {
  local: {
    icon: MapsHomeWorkIcon,
    title: "Endereços",
    fixedColor: "text-sky-500",
    prefix: null,
  },
  lightEconomic: {
    icon: LightModeIcon,
    title: "Gerada",
    fixedColor: "text-emerald-500",
    prefix: "Kwh",
  },
  light: {
    icon: ElectricBoltIcon,
    title: "Economia",
    fixedColor: "text-rose-500",
    prefix: "Kwh",
  },
  moneyEconomic: {
    icon: MoneyOffIcon,
    title: "Economia R$",
    fixedColor: "text-amber-500",
    prefix: "R$",
  },
  total: {
    icon: AttachMoneyIcon,
    title: "Total",
    fixedColor: "text-teal-500",
    prefix: "R$",
  },
};
const Title = {
  local: "Endereços",
};
// lex flex-row w-full
const ChartCard = ({ value = "0", type = "lightEconomic", isLoading = true }: ChartCardProps) => {
  const selectCardType = Cards[`${type}`];
  const prefix = selectCardType.prefix || "";
  const defaultColor = selectCardType && selectCardType.fixedColor ? selectCardType?.fixedColor : "text-gray-700";
  if (isLoading)
    return (
      <Skeleton
        variant="rectangular"
        className="min-w-[180px] w-full max-w-full flex sm:max-w-[200px]  md:max-w-[200px]  h-20 rounded-md "
      />
    );
  return (
    <Card className="min-w-[180px] w-full max-w-full flex sm:max-w-[200px]  md:max-w-[200px]  h-fit  ">
      <CardContent className="flex w-full flex-row items-center content-center">
        <Icon component={selectCardType.icon} className={cn("w-7 h-7", defaultColor)} />
        <div className="flex flex-col w-full justify-center  itens-center ml-4">
          <Typography sx={{ fontSize: 13 }} color="text.primary" className="font-semibold">
            {value}
            {/* {prefix ? prefix + " " : ""} {value} */}
          </Typography>
          <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom variant="body2">
            {selectCardType.title}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
