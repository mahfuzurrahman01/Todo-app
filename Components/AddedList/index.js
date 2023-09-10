import axios from "axios";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import { toastFunction } from '../../Components/Toast/index'
import {IoCheckmarkDoneOutline} from 'react-icons/io5';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BiEditAlt} from 'react-icons/bi';
export default function AddedList({ data, setDataSave }) {
    const [selected, setSelected] = useState({})
    const [modalOpen, setModalOpen] = useState(true)
    // this function will call when its time to get the selected item from db
    const getData = async (id) => {
        try {
            const response = await axios.get(`https://todo-server-theta-seven.vercel.app/findOne?id=${id}`)
            setSelected(response.data)
        }
        catch (error) {
            alert(error.message)
        }
    }
    // this function will call when its time to delete any item from db
    const deleteData = async (id) => {
        try {
            const result = await axios.delete(`https://todo-server-theta-seven.vercel.app/deleteOne?id=${id}`)
            if (result.data.deletedCount > 0) {
                toastFunction('success', 'Successfully Deleted')
                setDataSave(Math.random() * 100)
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    const updateGoal = async (id, newBody) => {
        try {
            const response = await axios.put(`https://todo-server-theta-seven.vercel.app/update/${id}`, newBody)
            if (response.data.acknowledged) {
                toastFunction('success', 'Successfully Updated')
                setDataSave(Math.random() * 100)
            }
            console.log(response)
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
// when user click on complete this function will work
    const onCompleteHandle = (id,todo,date,time) => {
      const body = { todo,date,time,complete: true }
      updateGoal(id,body)
    }

    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} selected={selected} setSelected={setSelected} setDataSave={setDataSave} />
            {
                data?.length > 0 && <div className='lg:w-[70%] md:w-full w-full p-5 rounded-lg bg-opacity-40 bg-gray-200 mx-auto gap-2 flex-col md:mt-8 mt-2 flex justify-center items-center'>
                    {
                        data?.map((target, i) => <div key={i} className='flex gap-1 w-full justify-center items-center md:flex-row flex-col'>
                            <div className="md:w-[50%] w-full flex gap-2 flex-grow md:items-center items-start md:flex-row flex-col ">
                            
                                <p className={`${target?.complete ? ' flex gap-3 items-center md:w-[70%] w-full text-gray-100 duration-300 font-sens bg-green-600 rounded-lg px-2 py-1 md:text-lg text-xs':'md:text-lg text-xs flex gap-3 items-center md:w-[70%] w-full text-gray-600 duration-300 font-sens bg-gray-200 rounded-lg px-2 py-1'}`}><span className={`${target?.complete ? "bg-gray-100 flex justify-center items-center text-gray-500 rounded-full text-xs w-6 h-6 p-1" :"bg-gray-400 flex justify-center items-center text-white rounded-full text-xs w-6 h-6 p-1"}`}>{i + 1} </span>{target.todo}</p>

                                <p className='lg:text-lg text-base text-gray-500 md:w-[10%] w-full font-sens bg-gray-200 rounded-lg px-2 py-1'>{target.time}</p>
                                <p className='lg:text-lg md:text-sm text-gray-500 font-sens md:w-[17%] w-full bg-gray-200 rounded-lg px-2 py-1'>{target.date}</p>
                            </div>
                            <div className='flex md:gap-2 gap-5 md:mt-0 mt-5'>
                                {
                                    !target?.complete && <button onClick={() => onCompleteHandle(target?._id,target?.todo,target?.date,target?.time)}><IoCheckmarkDoneOutline className="p-1 w-7 h-7 bg-green-600 text-white rounded-full"/></button>
                                }
                                <button onClick={() => deleteHandle(target._id)}><RiDeleteBin6Line className="p-1 w-7 h-7 bg-red-500 text-white rounded-full"/></button>
                                {
                                    !target?.complete && <button onClick={() => updateHandle(target._id)}>
                                    <label htmlFor="my-modal-3" >
                                        <BiEditAlt className="p-1 w-7 h-7 bg-yellow-400 cursor-pointer text-white rounded-full"/>
                                    </label>
                                </button> 
                                }
                            </div>
                        </div>)
                    }

                </div>
            }

        </>
    )
};
