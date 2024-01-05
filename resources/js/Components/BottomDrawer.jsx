import { useState } from "react"
import PrimaryButton from "./PrimaryButton"
import TextInput from "./TextInput"
import TextArea from "./TextArea"
import { useForm } from "@inertiajs/react"

function Drawer({ d, setDis }) {
    const {data, setData, post, errors} = useForm({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        files: null
    })




    return (
        <div className={" w-full h-full  fixed bg-[#00000060] "+d}>
            <div className={"absolute bg-white rounded-t-xl transition-all ease-in duration-500 left-0 w-full py-5 px-5 bottom-0"}>
                <div className="w-full justify-between flex flex-row">
                    <p className="text-2xl mb-2">Create New Recipie</p>
                    <i className="fi fi-rr-cross" onClick={() => setDis('hidden')}></i>
                </div>
                <form className="flex flex-col gap-3" onSubmit={(ev) => {
                    ev.preventDefault()
                    post(route('recipie.create'))
                    console.log(data)
                    setDis('hidden')
                }} encType="multipart/form-data">
                    <input type='file' onChange={(ev) => setData('files', ev.target.files)} multiple></input>
                    <TextInput placeholder='Recipie Title' onChange={(ev) => {console.log(ev.target.value);setData('title', ev.target.value)}} className='w-full'></TextInput>
                    <TextInput placeholder='Recipie Description' onChange={(ev) => {setData('description', ev.target.value)}} className='w-full'></TextInput>
                    <TextArea placeholder={'Ingredients'} onChange={(ev) => {setData('ingredients', ev.target.value)}} className='w-full'></TextArea>
                    <TextArea placeholder={'Instructions'} onChange={(ev) => {setData('instructions', ev.target.value)}} className='w-full'></TextArea>


                    <PrimaryButton className="w-fit float-right self-end">Save</PrimaryButton>
                </form>
            </div>
        </div>
    )
}

export default Drawer
