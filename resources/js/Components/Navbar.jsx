import '@flaticon/flaticon-uicons/css/all/all.css'
import { Link } from '@inertiajs/react'


function Navbar({ page, setD, d }) {
    return (
        <div className='lg:w-20 bg-white w-full lg:h-full flex flex-row lg:flex-col justify-between text-xl absolute bottom-0 left-0 px-8 py-8'>
            <Link href={route('home')}><i class={`fi ${page == 'home' ? `fi-ss-home` : 'fi-rr-home'}`}></i></Link>
            <Link href={route('search')}><i class={`fi ${page == 'search' ? `fi fi-ss-search` : 'fi fi-rs-search'}`}></i></Link>
            <button onClick={() => {
                setD('block')
                console.log(d)
            }} className='bg-chi-color shadow-lg h-12 w-12 -mt-5 text-black text-center flex flex-col items-center justify-center rounded-full'>
                <i class="fi fi-rs-plus"></i>
            </button>
            <Link href={route('collection')}><i class={`fi ${page == 'collection' ? `fi fi-ss-bookmark` : 'fi fi-rr-bookmark'}`}></i></Link>
            <Link href={route('view-profile')}><i class={`fi ${page == 'profile' ? `fi-rs-circle-user` : 'fi-rr-circle-user'}`}></i></Link>

        </div>
    )
}


export default Navbar
