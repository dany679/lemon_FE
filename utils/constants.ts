import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import InfoIcon from "@mui/icons-material/Info";
import MonitorIcon from "@mui/icons-material/Monitor";
import "dotenv/config";
import { ComponentType } from "react";
import { config } from "./config";
export const BASE_HTTP = config.BASE_HTTP;
export const webTitle = config.webTitle;
export const DEFAULT_LIMIT = config.DEFAULT_QUERY_LIMIT;

export type IconComponent =
  | ComponentType<{
      fontSize?: "default" | "small" | "large" | undefined;
    }>
  | ComponentType<{ className?: string }>;
export const toolsObjects = {
  fees: {
    icon: MonitorIcon,
    href: "/faturas",
    label: "Faturas de pagamentos",
    subTitle: "Fique de olho na sua fatura",
    color: " text-orange-700",
    colorDark: " text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  dashboard: {
    icon: DonutSmallIcon,
    href: "/",
    label: "Dashboard",
    subTitle: "Seja bem vindo, aqui todos os seus dados estão de facil acesso",
    color: " text-sky-700",
    colorDark: " text-sky-700",
    bgColor: "bg-sky-500/10",
  },
  about: {
    icon: InfoIcon,
    href: "/about",
    label: "Sobre",
    // subTitle: "Aqui sabemos um pouco mais sobre a pagina, a ideia geral e sua stack",
    subTitle:
      "Este Pagina tem o intuito de explicar o site, espero que goste",
    color: " text-sky-700",
    colorDark: " text-sky-700",
    bgColor: "bg-sky-500/10",
  },
};
