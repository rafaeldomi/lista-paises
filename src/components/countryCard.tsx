import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CountryCard({name, ptName, flag, flagAlt}:
    {
        name: string;
        ptName: string;
        flag: string;
        flagAlt: string;
    }) {
  return (
    <>
        <Link href={name}>
            <article  className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl">
                <h1 className="text-center font-bold text-l">{ptName}</h1>

                <div className="relative w-full h-40 overflow-hidden rounded-xl mt-3">
                <Image src={flag} alt={flagAlt} fill/>
                </div>
            </article>
        </Link>
    </>
  )
}

export default CountryCard