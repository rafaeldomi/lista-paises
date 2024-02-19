import CountryCard from "@/components/countryCard";
import Image from "next/image";
import Link from "next/link";

export type Country = {
  name: {
    common: string,
    official: string
  },
  translations: {
    por: {
      common: string;
    }
  },
  flags: {
    svg: string,
    png: string,
    alt: string
  },
  capital: string,
  region: string,
  subregion: string,
  population: number,
  languages?: {
    [key: string]: string;
  },
  borders?: string[],
  cca3: string
}

async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default async function Home() {
  const countriesResponse = await getCountries();
  const countries = countriesResponse.sort((a,b) => a.translations.por.common.localeCompare(b.translations.por.common));
  const regions = [...new Set(countries.map(item => item.region))].sort((a,b) => a.localeCompare(b));

  return (
    <>
      <section className="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
        {countries.map((country)=> (
          <CountryCard key={country.name.common} name={country.name.common} ptName={country.translations.por.common} flag={country.flags.svg} flagAlt={country.flags.alt}  />
        ))}
      </section>
    </>
  );
}
