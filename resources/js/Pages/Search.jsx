import Navbar from '@/Components/Navbar'
import Mobile from '@/Layouts/MobileLayout'
import { Head } from '@inertiajs/react'

function Search({  }) {
    return (
        <Mobile page={'search'}>
            <Head title='Search'></Head>
            <Navbar ></Navbar>

            <main>
                <h1 className='mt-8 text-2xl'>Search Through Our Recipies</h1>
                <p className=' mb-3'>Search through our large collection of recipies posted here by users, you can search for ingredients, or users.</p>
                <div className='w-full rounded-full bg-gray-100 flex flex-row gap-2 items-center px-5 py-2 '>
                    <i className='fi fi-rr-search'></i>
                    <input type='search' className='w-full outline-none outline-0 border-none bg-transparent' placeholder='Search...'></input>
                </div>
            </main>
        </Mobile>
    )
}

export default Search
