import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toastFunction } from '../Toast';

const Modal = ({ selected, setDataSave, setSelected, modalOpen, setModalOpen }) => {


    // this function will call for update a specific goal/item 
    const updateGoal = async (id, newBody) => {
        try {
            const response = await axios.put(`http://localhost:5000/update/${id}`, newBody)
            if (response.data.acknowledged) {
                setModalOpen(false)
                toastFunction('success', 'Successfully Updated')
                setDataSave(parseInt(Math.random() * 100))
            }
            console.log(response)
        }
        catch (error) {
            alert(error.message)
        }

    }

    // when input is update and submit this function will call 
    const updatedInput = (e) => {
        e.preventDefault()
        const todo = e.target.todo.value;
        const time = e.target.time.value;
        if (todo === '' || todo === undefined || time === '' || time === undefined) {
            toastFunction('error', 'Sorry you have to set both GOAL and TIME')
            return
        }
        const newBody = { todo, time }
        updateGoal(selected._id, newBody)

    }
    // //on closing we will remove the old data from selection
    // const closeModalFunc = () => {
    //     setSelected({})
    // }


    return (
        <div>
            {
                modalOpen && <div>
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <div className='bg-gray-300 p-3 mb-4 rounded-lg flex flex-col justify-center items-center'>
                                <p className=' text-slate-600 font-semibold text-center text-lg mb-2'>Your previous goal </p>
                                <div className='flex w-[90%] justify-center items-center gap-2'>
                                    <p placeholder='Set your new goal' className='bg-rose-300 px-3 py-1 rounded-lg w-[60%]'>{selected.todo}</p>
                                    <p name='time' type="time" placeholder='Set your new time' className='bg-emerald-400 px-3 py-1 rounded-lg' >{selected.time}</p>
                                </div>
                            </div>
                            <p className='text-center text-gray-700 text-lg mb-3'>You can edit your last choice from here..</p>
                            <form onSubmit={updatedInput} className="flex flex-col  items-center gap-3">
                                <div className='flex w-[90%] justify-center items-center gap-2'>
                                    <input name='todo' type="text" placeholder='Set your new goal' className='bg-sky-300 px-3 py-1 rounded-lg w-[60%]' />
                                    <input name='time' type="time" placeholder='Set your new time' className='bg-amber-300 px-3 py-1 rounded-lg' />
                                </div>
                                <button type='submit' className='rounded px-5 w-1/2 py-1 bg-violet-300 text-white hover:bg-violet-400 duration-300'>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Modal;