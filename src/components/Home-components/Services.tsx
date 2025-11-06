import { Services_Data } from '@data/Services-data'
import React from 'react'
import type { IconType } from 'react-icons'

export default function Services() {
  return (
    <div
      className="
        w-full h-auto flex flex-col justify-center items-center gap-12 mb-20 
        relative overflow-hidden
        bg-gradient-to-br from-[#e8fff0] via-[#f3f8ff] to-[#e3ffe7]
        dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364]
        p-10 rounded-3xl
      "
    >
      {/* افکت نور و گرادیانت متحرک */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-300/20 via-transparent to-emerald-400/20 blur-3xl animate-pulse" />

      <h1 className="relative text-5xl text-center text-white z-10 after:content-[''] after:block after:w-1/2 after:h-[4px] after:bg-gradient-to-r after:from-black after:to-green-600 after:mx-auto after:mt-3 after:rounded-md">
        چرا <b className='text-green-600'>کارنو</b> ؟
      </h1>

      <div className="relative z-10 w-11/12 flex flex-col justify-center items-center gap-12 sm:flex-row flex-wrap">
        {Services_Data.map((service, idx) => (
          <div
            key={idx}
            className="
              w-full sm:w-[22rem] h-[18rem]
              bg-green-100/30 
              rounded-3xl 
              shadow-lg 
              p-7 
              flex flex-col justify-center items-center gap-5
              border border-green-200/40 
              backdrop-blur-md
              transition-all duration-500 ease-out
              hover:scale-105
              hover:bg-green-200/40
              hover:shadow-[0_8px_30px_rgba(0,255,0,0.2)]
              hover:border-green-400/60
              hover:backdrop-blur-xl
              hover:-translate-y-2
              group
            "
          >
            <h1 className="text-6xl text-green-600 drop-shadow-sm ">
              {typeof service.Icon === 'string'
                ? service.Icon
                : React.createElement(service.Icon as IconType)}
            </h1>

            <h2 className="text-xl font-bold text-gray-800 ">
              {service?.Title}
            </h2>

            <p className="text-gray-600 text-center leading-relaxed">
              {service?.Description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
