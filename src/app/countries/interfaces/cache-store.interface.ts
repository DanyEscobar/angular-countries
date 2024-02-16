import { Country } from "./country";
import { Continent } from "./region.type";

export interface CacheStore {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Continent;
  countries: Country[];
}
