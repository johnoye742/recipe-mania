import { Link } from "@inertiajs/react"
import PrimaryButton from "./PrimaryButton"

function Recipie({ title, img, id }) {
    return (
        <div className="hover:shadow-lg p-3 rounded-lg transition-all ease-in-out duration-200">
            <img className='h-52 object-cover rounded-lg' src={img} alt='cursed'></img>
            <div className='w-full flex flex-row justify-between mb-2'>
                <h1 className='text-xl'>{title}</h1>
                <i class="fi fi-rr-bookmark text-xl pt-1"></i>
            </div>
            <Link href={route('recipie', {'id': id})}><PrimaryButton>View Details</PrimaryButton></Link>
        </div>
    )
}

export default Recipie
