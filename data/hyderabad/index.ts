import type { CityMeta } from "@/types/city";
import type { AreaData } from "@/types/area";
import type { ProjectData } from "@/types/project";
import kokapet from "./areas/kokapet";
import narsingi from "./areas/narsingi";
import gachibowli from "./areas/gachibowli";
import tellapur from "./areas/tellapur";
import mokila from "./areas/mokila";
import kollur from "./areas/kollur";
import kondapur from "./areas/kondapur";
import financialDistrict from "./areas/financial-district";
import prestigeGoldenGrove from "./projects/prestige-golden-grove";
import ramkyOneOdyssey from "./projects/ramky-one-odyssey";
import lansumElena from "./projects/lansum-elena";
import myhomeApas from "./projects/myhome-apas";
import godrejMadisonAvenue from "./projects/godrej-madison-avenue";
import brigadeGatewayKokapet from "./projects/brigade-gateway-kokapet";
import prestigeHighFields from "./projects/prestige-high-fields";
import myscapeSongsOfTheSun from "./projects/myscape-songs-of-the-sun";
import dsrTwins from "./projects/dsr-twins";
import sasDiamondTowers from "./projects/sas-diamond-towers";
import auroRegent from "./projects/auro-regent";
import aparnaSerenePark from "./projects/aparna-serene-park";
import aparnaLuxorPark from "./projects/aparna-luxor-park";
import myhomeMangala from "./projects/myhome-mangala";

export const hyderabadMeta: CityMeta = {
  slug: "hyderabad",
  name: "Hyderabad",
  state: "Telangana",
  tagline: "India's fastest-growing IT real estate market",
  areas: ["financial-district", "kokapet", "narsingi", "tellapur", "gachibowli", "mokila", "kollur", "kondapur"],
  topAreas: ["financial-district", "kokapet", "narsingi", "gachibowli", "kondapur"],
  lastUpdated: "2025-04-25",
};

export const hyderabadAreas: Record<string, AreaData> = {
  "financial-district": financialDistrict,
  kokapet,
  narsingi,
  gachibowli,
  kondapur,
  tellapur,
  mokila,
  kollur,
};

export const hyderabadProjects: Record<string, ProjectData> = {
  "prestige-golden-grove": prestigeGoldenGrove,
  "ramky-one-odyssey": ramkyOneOdyssey,
  "lansum-elena": lansumElena,
  "myhome-apas": myhomeApas,
  "godrej-madison-avenue": godrejMadisonAvenue,
  "brigade-gateway-kokapet": brigadeGatewayKokapet,
  "prestige-high-fields": prestigeHighFields,
  "myscape-songs-of-the-sun": myscapeSongsOfTheSun,
  "dsr-twins": dsrTwins,
  "sas-diamond-towers": sasDiamondTowers,
  "auro-regent": auroRegent,
  "aparna-serene-park": aparnaSerenePark,
  "aparna-luxor-park": aparnaLuxorPark,
  "myhome-mangala": myhomeMangala,
};

export function getAreaData(slug: string): AreaData | undefined {
  return hyderabadAreas[slug];
}
