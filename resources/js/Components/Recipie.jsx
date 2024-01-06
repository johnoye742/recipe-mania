import { Link } from "@inertiajs/react"
import PrimaryButton from "./PrimaryButton"

function Recipie({ title, img, id, email, saved, sauce }) {
    console.log('email '+email)
    return (
        <div className="hover:shadow-lg p-3 rounded-lg transition-all ease-in-out duration-200">
            <img className='h-52 object-cover rounded-lg w-full' src={img} alt='cursed'></img>
            <div className='w-full flex flex-row justify-between mb-2'>
                <h1 className='text-xl'>{title}</h1>
                { !saved ? <Link as="button" method='post' data={{'id': id, 'email': email}} href={route('save-recipie')} className=" pt-1"><i className="fi fi-rr-bookmark"></i></Link> :  <Link as="button" href={route('delete-saved')} method="post" data={{id: id}} className="pt-1"><i className="fi fi-rr-trash text-red-600"></i></Link>}
            </div>
            <Link href={ sauce == 'collection' ? route('collection.recipie', {'id': id}) : route('recipie', {'id': id}) }><PrimaryButton>View Details</PrimaryButton></Link>
        </div>
    )
}

export default Recipie
