import { useRouter } from 'next/router'
import {BiArrowBack} from 'react-icons/bi'
import React, { useCallback } from 'react'

interface HeaderProps{
    label: string;
    showBackArrow?:boolean; //This is an optional prop so it uses ?: instead of :
}
//Extracting the label and showBackArrow from the HeaderProps interface
const Header: React.FC<HeaderProps> = ({label,showBackArrow}) => {
    const router = useRouter();

    const handleBack = useCallback(()=>{
        router.back();
    },[router])
  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
        <div className="flex flex-row items-center gap-2">
            {
                showBackArrow &&(
                    <BiArrowBack size={20} color='white' onClick={handleBack} className='
                        cursor-pointer
                        hover:opacity-70
                        transition
                    '/>
                )
            }
            <h1 className='text-white text-xl font-semibold'>
               {label} 
            </h1>
        </div>
    </div>
  )
}

export default Header