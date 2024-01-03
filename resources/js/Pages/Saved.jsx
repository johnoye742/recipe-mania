import Navbar from '@/Components/Navbar'
import Recipie from '@/Components/Recipie'
import Mobile from '@/Layouts/MobileLayout'
import { Head, Link } from '@inertiajs/react'

function Saved({ collection, }) {
    console.log(collection);
    return (
        <Mobile page={'collection'}>
            <Head title='Collection'></Head>
            <Navbar></Navbar>

            <main>
                <h1 className='text-3xl'>Saved Recipies</h1>
                <div className='grid grid-cols-2'>
                    { collection.length == 0 ? <p>Sorry you have not saved any recipies yet! <Link className='text-yellow-500' href={route('home')}>Browse</Link></p> : collection.map((item) => <Recipie title={item.title} saved={'true'} id={item.id} img={'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}></Recipie>) }
                </div>
            </main>
        </Mobile>
    )
}

export default Saved
