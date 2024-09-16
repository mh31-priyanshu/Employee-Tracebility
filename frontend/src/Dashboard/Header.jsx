import { CircleUserRound, CroissantIcon, Cross, CrossIcon, Crosshair, MenuIcon, Moon, X } from 'lucide-react';
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
  const {openSideBar, setOpenSideBar} = useGlobal();

  return (
    <header className=''>
      <div className='flex justify-between bg-white px-[30px] items-center'>
        <div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6798a9241c17dbb1d4d5c7490ae3dfaa3561f3d4bed1a9847acf18d80520877?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3" alt="Logo" 
          className="object-contain aspect-[5.15] w-[160px] mb-[60px] mt-7 md:hidden " />
            
        </div>
        <div className="flex gap-10 max-md:gap-5 items-start bg-white">
          <Moon className="object-contain shrink-0 w-[40px] h-[50px] rounded-3xl aspect-square cursor-pointer" strokeWidth={0.7} />
            <CircleUserRound className="object-contain shrink-0 w-[40px] h-[50px] rounded-3xl aspect-square cursor-pointer" strokeWidth={0.7} />
          {openSideBar?(
            <X className="object-contain shrink-0 w-[40px] h-[50px] rounded-3xl aspect-square cursor-pointer md:hidden" 
            strokeWidth={0.7}
            onClick={()=>{setOpenSideBar(!openSideBar)}}
            />
            
          ):(
            <MenuIcon className="object-contain shrink-0 w-[40px] h-[50px] rounded-3xl aspect-square cursor-pointer md:hidden" 
            strokeWidth={0.7}
            onClick={()=>{setOpenSideBar(!openSideBar)}}
            />
          )}
        </div>
      </div>
      <div className="flex gap-10 justify-between items-center px-5 py-4 font-medium bg-white min-h-[60px] max-md:w-full">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ef06f6398f3d2ab3302f629178c7917df596ff0dee3f6615a800534649e8aba?placeholderIfAbsent=true&apiKey=ab952a7505584a89aa779c6b786731e3" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
        <h1 className="self-stretch my-auto text-xl text-center text-zinc-700 w-[437px] ">
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