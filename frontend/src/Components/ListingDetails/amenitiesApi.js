import { HiOutlineWifi } from "react-icons/hi";
import { PiTelevisionSimple, PiCampfireLight } from "react-icons/pi";
import {
  MdOutlineKitchen,
  MdOutlinePool,
  MdDinnerDining,
} from "react-icons/md";

import { PiFireExtinguisher } from "react-icons/pi";
import { GiLift } from "react-icons/gi";
import { TbSunElectricity } from "react-icons/tb";
import { BiSolidWasher, BiSolidFirstAid } from "react-icons/bi";
import { AiOutlineCar, AiOutlineAlert } from "react-icons/ai";
import { CgPiano } from "react-icons/cg";
import { CiDumbbell } from "react-icons/ci";
import { GiBathtub } from "react-icons/gi";
import { BsSpeedometer2, BsSnow, BsPersonWorkspace } from "react-icons/bs";

export const amenities = [
  { id: 1, name: "Wifi", svg: HiOutlineWifi },
  { id: 2, name: "TV", svg: PiTelevisionSimple },
  { id: 3, name: "Kitchen", svg: MdOutlineKitchen },
  { id: 4, name: "Washing Machine", svg: BiSolidWasher },
  { id: 5, name: "Paid parking", svg: BsSpeedometer2 },
  { id: 6, name: "Air conditioning", svg: BsSnow },
  { id: 7, name: "Dedicated workspace", svg: BsPersonWorkspace },
  { id: 8, name: "Free parking", svg: AiOutlineCar },
  { id: 9, name: "Pool", svg: MdOutlinePool },
  { id: 10, name: "Bathtub", svg: GiBathtub },
  { id: 11, name: "Heater", svg: PiCampfireLight },
  { id: 12, name: "Outdoor dining area", svg: MdDinnerDining },
  { id: 13, name: "Music System", svg: CgPiano },
  { id: 14, name: "Nearby Gym", svg: CiDumbbell },
  { id: 15, name: "Lift Service", svg: GiLift },
  { id: 16, name: "24/7 Electricity", svg: TbSunElectricity },
  { id: 17, name: "Safety alarm", svg: AiOutlineAlert },
  { id: 18, name: "First aid kit", svg: BiSolidFirstAid },
  { id: 19, name: "Fire extinguisher", svg: PiFireExtinguisher },
];
