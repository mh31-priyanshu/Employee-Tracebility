import { CircleUserRound, Moon } from 'lucide-react';
import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import DateObject from "react-date-object";

function Header() {
  const Overview = {
    'user-master':'User Master',
    'shift-master':'Shift Master',
    'line-master':'Line Master',
    'line-assignment':'Line Assignment',
    'station-master':'Station Master',
    'barcode-verify':'Barcode Verify',
    'data-backup':'Data Backup',
    'data-restore':'Data Restore',
  }
  const {selectedPage } = useGlobal();
  console.log(selectedPage);

  var date = new DateObject({
    date: new Date(),
  });

  return (
    <header>
      <div className='flex justify-between bg-white px-[30px]'>
        <div></div>
        <div className="flex z-10 flex-wrap gap-10 items-start px-5 py-7 bg-white">
          <Moon className="object-contain shrink-0 w-[40px] h-[50px] rounded-3xl aspect-square cursor-pointer" strokeWidth={0.7} />
            <CircleUserRound className="object-contain shrink-0 w-[40px] h-[50px] rounded-3xl aspect-square cursor-pointer" strokeWidth={0.7} />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-between items-center px-5 py-4 font-medium bg-white min-h-[60px] max-md:max-w-full">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ef06f6398f3d2ab3302f629178c7917df596ff0dee3f6615a800534649e8aba?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
        <h1 className="self-stretch my-auto text-xl text-center text-zinc-700 w-[437px] max-md:max-w-full">
          {selectedPage==''?'Overview':Overview[selectedPage]}
        </h1>
        <time className="self-stretch my-auto text-sm text-gray-500">
          {date.format("dddd, MMMM DD, YYYY")}
        </time>
      </div>
    </header>
  );
}

export default Header;