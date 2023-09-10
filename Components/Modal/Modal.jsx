import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toastFunction } from '../Toast';

const Modal = ({ selected, setDataSave, setSelected, modalOpen, setModalOpen }) => {
    const [goalLength, setGoalLength] = useState(0)
    // this function will call for update a specific goal/item 
    const updateGoal = async (id, newBody) => {
        try {
            const response = await axios.put(`https://todo-server-theta-seven.vercel.app/update/${id}`, newBody)
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

    const goalInputSection = (event) => {
        event.preventDefault()
        const goal = event.target.value;
        setGoalLength(goal.length)
      }

    // when input is update and submit this function will call 
    const updatedInput = (e) => {
        e.preventDefault()
        const todo = e.target.todo.value;
        const time = e.target.time.value;
        const date = e.target.date.value;
        console.log(date)
        if (todo === '' || todo === undefined || time === '' || time === undefined || date === '' || date === undefined) {
            toastFunction('error', 'Sorry you have to set both GOAL, DATE and TIME')
            return
        }
        const newBody = { todo, time,date,complete: false }
        updateGoal(selected._id, newBody)

    }
    // //on closing we will remove the old data from selection
    // const closeModalFunc = () => {
    //     setSelected({})
    // }

const backgroundImageUrl = 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80';
const minDate = new Date().toISOString().split('T')[0];
    return (
        <div>
            {
                modalOpen && <div className='relative'>
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="bg-blend-darken modal top-[-110px] bg-no-repeat bg-cover"
                     style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
                     >
                        <div className="bg-opacity-60 modal-box lg:w-[40%] md:w-3/4 w-11/12  max-w-5xl min-h-5xl">
                           <div className=''>
                           <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <div className='bg-gray-300 p-3 mb-4 rounded-lg flex flex-col justify-center items-center'>
                                <p className=' text-slate-600 font-semibold text-center text-lg mb-2'>Your previous goal </p>
                                <div className="justify-center my-2 w-[100%] flex md:flex-row flex-col gap-2 flex-grow items-center">
                                
                                <p className=' flex gap-3 items-center min-w-[50%] py-2 text-gray-500 font-sens bg-gray-200 rounded-lg px-2'>{selected.todo}</p>

                                <p className='text-lg text-gray-500 font-sens bg-gray-200 rounded-lg px-2 py-1'>{selected.time}</p>
                                <p className='text-lg text-gray-500 font-sens bg-gray-200 rounded-lg px-2 py-1'>{selected.date}</p>
                            </div>
                            </div>
                          
                            <form onSubmit={updatedInput} className="relative flex flex-col  items-center gap-3">
                                <p className={`absolute top-2 right-12 ${goalLength === 0 && 'text-gray-400'} ${goalLength > 0 && goalLength < 30 && 'text-green-500'} ${goalLength === 30 && 'text-red-500'}  text-sm`}>{goalLength}/30</p>
                                <div className='flex w-[90%] justify-center flex-col items-center gap-2'>
                                    <input maxLength="30" onChange={goalInputSection} name='todo' type="text" placeholder='Set your new goal' className='w-full rounded-lg px-5 py-2 outline-none' />
                                    <input min={minDate} name='date' type="date" placeholder='Set your new date' className='w-full rounded-lg px-5 py-2 outline-none' />
                                    <input name='time' type="time" placeholder='Set your new time' className='w-full rounded-lg px-5 py-2 outline-none' />
                                </div>
                                <button type='submit' className='px-10 py-2 rounded bg-orange-400 hover:bg-orange-500 duration-300 text-white mt-4'>Update</button>
                            </form>
                           </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Modal;