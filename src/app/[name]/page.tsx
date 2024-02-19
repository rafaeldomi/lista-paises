import React from 'react'
import { Country } from '../page'
import Image from 'next/image';
import CountryCard from '@/components/countryCard';


// async function getCountryByName(name: string): Promise<Country> {
//   const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
//   return (await response.json())[0];
// }

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();
  return countries.find((country: Country) => country.name.common === name)!;
}

type TBorder = {
  name: string,
  ptName: string,
  flag: string,
  flagAlt: string
}

async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find((country: Country) => country.name.common === name)!;
  console.log(country.borders);

  return country.borders?.map((border) => {
    const borderCountry  = countries.find((country: Country) => country.cca3 === border)!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt
    };
  });
}

async function Pais({ params: { name } }: {params: {name: string}}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBordersByName(decodeURI(name));
  const formatter = Intl.NumberFormat("en", {notation: "compact"});

  return (
    <>
      <section className='flex container flex-col'>
        <h1 className='text-5xl text-center font-bold text-gray-800 mt-5'>{country.translations.por.common}</h1>

        <article className='flex flex-col md:flex-row justify-between rounded-xl bg-white w-full p-10 mt-2'>
          <section>
            {country.capital && (
            <h2 className="text-xl text-gray-800">
              <b>🏙️ Capital:</b> {country.capital}
            </h2>)}

            <h2 className="text-xl text-gray-800">
              <b>🗺️ Continente:</b> {country.region}{country.subregion && ` - ${country.subregion}`}
            </h2>
            <h2 className="text-xl text-gray-800">
              <b>👨‍👩‍👧‍👦 População:</b> {formatter.format(country.population)}
            </h2>
            {country.languages && (
            <h2 className="text-xl text-gray-800">
              <b>🗣️ </b> 
              {Object.values(country.languages).map((lang) => (
                <span key={lang} className="px-2 mx-1 inline-block text-white text-sm rounded-full bg-indigo-800">{lang}</span>
              ))
              }
            </h2>)}
          </section>

          <div className='relative h-48 my-2 md:h-auto w-96 shadow-md md:order-last order-first'>
            <Image alt={country.flags.alt} src={country.flags.svg} fill className="object-cover" />
          </div>
        </article>

        <article>
          <h3 className="mt-12 text-2xl font-semibold text-gray-800">Fronteiras</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2">
              {borderCountries?.map((border) => (
                <CountryCard key={border.name} {...border}  />
              ))}
          </div>
        </article>
      </section>
    </>
  )
}

export default Pais