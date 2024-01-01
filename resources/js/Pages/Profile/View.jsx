
import Navbar from '@/Components/Navbar'
import Mobile from '@/Layouts/MobileLayout'
import { Head } from '@inertiajs/react'
import { createAvatar } from '@dicebear/core'
import { funEmoji } from '@dicebear/collection'
import { useMemo } from 'react'
import DangerButton from '@/Components/DangerButton'
import {Link} from '@inertiajs/react'

export default function ViewProfile({ user }) {
    const avatar = useMemo(() => {
        return createAvatar(funEmoji, {
          size: 128,
          seed: user.name
          // ... other options
        }).toDataUriSync();
      }, []);
    return (
        <Mobile page={'profile'}>
            <Head title='View Profile'></Head>
            <Navbar></Navbar>

            <main className='w-full'>
                <div className='w-full flex flex-col items-center'>
                    <img src={avatar} className='rounded-full '></img>
                    <h1 className='text-2xl pt-2'>{user.name}</h1>
                    <Link method='post' as='button' href={route('logout')}><DangerButton>Logout</DangerButton></Link>
                </div>

            </main>
        </Mobile>
    )
}
