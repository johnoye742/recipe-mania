import Navbar from '@/Components/Navbar'
import Mobile from '@/Layouts/MobileLayout'
import { Head, router } from '@inertiajs/react'
import Recipie from '@/Components/Recipie'
import { useState } from 'react'

function Search({ recipies, user, query }) {
    const [q, setQ] = useState(query);
    console.log(recipies)

    return (
        <Mobile page={'search'}>
            <Head title='Search'></Head>
            <Navbar ></Navbar>

            <main>
                <h1 className='mt-8 text-2xl'>Search Through Our Recipies</h1>
                <p className=' mb-3'>Search through our large collection of recipies posted here by users, you can search for ingredients, or users.</p>
                <div className='w-full rounded-full bg-gray-100 flex flex-row gap-2 items-center px-5 py-2 '>
                    <i className='fi fi-rr-search'></i>
                    <form onSubmit={(ev) => {
                        ev.preventDefault()
                        router.get('', { q: q })
                    }}>
                        <input type='search' value={q} onChange={(ev) => {
                            setQ(ev.target.value)
                        }} className='w-full outline-none outline-0 border-none bg-transparent' placeholder='Search...'></input>
                    </form>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
                    { recipies && recipies.map((recipie) => <Recipie email={user && user.email} id={recipie.id} title={recipie.title} img={ JSON.parse(recipie.images_url) != null ? JSON.parse(recipie.images_url).urls[0] : 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}></Recipie>) }
                </div>
            </main>
        </Mobile>
    )
}

export default Search
