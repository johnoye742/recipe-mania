import Drawer from '@/Components/BottomDrawer'
import Navbar from '@/Components/Navbar'
import { useState } from 'react'

function Mobile({ children, page }) {
    const [d, setD] = useState('hidden')
    const [bottom, setBottom] = useState('-bottom-52')
    console.log(page)
    return (
        <div className="bg-gray-100 w-full flex flex-col items-center">

            <div className="lg:w-[40%] px-8 py-5 h-[100vh] bg-white relative">
                <div className="w-full">
                    <div className='flex flex-row gap-3'>
                        <i class="fi fi-rr-menu-burger text-2xl"></i>
                        <h1 className='capitalize font-bold text-lg'>{page}</h1>
                    </div>

                </div>
                { children }

                <Navbar page={page} setD={setD} d={d}></Navbar>

                <p className='-bottom-52'></p>
            </div>

            <Drawer d={d} setDis={setD}></Drawer>
        </div>
    )
}

export default Mobile
