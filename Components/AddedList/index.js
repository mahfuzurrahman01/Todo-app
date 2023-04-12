import axios from "axios";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import { toastFunction } from '../../Components/Toast/index'

export default function AddedList({ data, setDataSave }) {
    const [selected, setSelected] = useState({})
    const [modalOpen, setModalOpen] = useState(true)
    // this function will call when its time to get the selected item from db
    const getData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/findOne?id=${id}`)
            setSelected(response.data)
        }
        catch (error) {
            alert(error.message)
        }
    }
    // this function will call when its time to delete any item from db
    const deleteData = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/deleteOne?id=${id}`)
            if (result.data.deletedCount > 0) {
                toastFunction('success', 'Successfully Deleted')
                setDataSave(Math.random() * 100)
            }
        }
        catch (error) {
            alert(error.message)
        }
    }
    // when update button is clicked this function will call
    const updateHandle = (id) => {
        setModalOpen(true)
        getData(id)
    }

    // delete an item 
    const deleteHandle = (id) => {
        deleteData(id)

    }
    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} selected={selected} setSelected={setSelected} setDataSave={setDataSave} />
            {
                data?.length > 0 && <div className='w-[60%] p-5 rounded-lg bg-violet-200 mx-auto shadow-2xl gap-2 shadow-gray-300 flex-col mt-8 flex justify-center items-center'>
                    {
                        data?.map((target, i) => <div key={i} className='flex gap-5 w-full justify-center items-center'>
                            <div className="w-[60%] flex gap-2 flex-grow items-center">
                                
                                <p className='text-lg flex gap-3 items-center w-[90%] text-gray-500 font-sens bg-gray-200 rounded-lg px-2 py-1'><span className="bg-gray-400 flex justify-center items-center text-white rounded-full text-xs w-6 h-6 p-1">{i + 1} </span>{target.todo}</p>

                                <p className='text-lg text-gray-500 font-sens bg-gray-200 rounded-lg px-2 py-1'>{target.time}</p>
                            </div>
                            <div className='w-35% flex gap-2'>
                                <button className='px-2 py-1 rounded-md bg-green-400 hover:bg-green-500 duration-300 uppercase text-sm text-white'>Complete</button>
                                <button onClick={() => deleteHandle(target._id)} className='px-2 py-1 rounded-md bg-red-400 hover:bg-red-500 duration-300 uppercase text-sm text-white'>Delete</button>
                                <button onClick={() => updateHandle(target._id)}>
                                    <label htmlFor="my-modal-3" className=' px-2 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 duration-300 uppercase text-sm text-white'>
                                        Update
                                    </label>
                                </button>
                            </div>
                        </div>)
                    }

                </div>
            }

        </>
    )
};
