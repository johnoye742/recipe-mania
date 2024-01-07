import Drawer from '@/Components/BottomDrawer'
import Navbar from '@/Components/Navbar'
import { useState } from 'react'
import './scrollbar.css'

function Mobile({ children, page }) {
    const [d, setD] = useState('hidden')
    const [bottom, setBottom] = useState('-bottom-52')
    console.log(page)
    return (
        <div className="bg-gray-100 w-full flex flex-col items-center">

            <div className="w-full px-8 py-5 h-[100dvh] bg-white relative">
                <div className="w-full lg:ml-20">
                    <div className='flex flex-row items-center gap-3'>
                        <img src={location.origin+'/images/logo.png'} className=' h-11 w-12 rounded-xl'></img>
                        <h1 className='capitalize font-bold text-lg'>{page}</h1>
                    </div>

                </div>
                <div className=' lg:ml-20 pb-14 pr-4 h-[87%] lg:h-[100%] lg:w-[90%]  overflow-y-scroll'>
                    { children }
                </div>
                <Navbar page={page} setD={setD} d={d}></Navbar>

                <p className='-bottom-52'></p>
            </div>

            <Drawer d={d} setDis={setD}></Drawer>
        </div>
    )
}

export default Mobile
