import { TbReport } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";

import {
  FaGift,
  FaIdCard,
  FaList,
  FaPeopleGroup,
  FaTicket,
} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { PiHandWithdraw } from "react-icons/pi";

export const sideBarData = [
  {
    label: "Dashboard",
    icon: <FaHome />,
    key: "/",
  },
  {
    label: "Rewards",
    icon: <FaGift />,
    key: "/reward",
  },
  {
    label: "LuckyNumbers",
    icon: <FaTicket />,
    key: "/luckyNumbers",
  },
  {
    label: "Lottery",
    icon: <PiHandWithdraw />,
    key: "/lottery",
  },

  {
    label: "Top 10",
    icon: <FaList />,
    key: "/top-10",
  },
  {
    label: "Agents",
    icon: <FaPeopleGroup />,
    key: "/agent",
  },
  {
    label: "Terms & Policies",
    icon: <FaIdCard />,
    key: "/term",
  },
  {
    label: "Report",
    icon: <TbReport />,
    key: "/report",
  },
];
