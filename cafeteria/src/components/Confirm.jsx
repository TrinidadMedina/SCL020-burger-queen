import React from 'react'

export function ModalConfirm({ modal, toggleConfirm, message }) {

    const handleClick = (status) =>{
        toggleConfirm(status)
    }

     if (modal)
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto max-h-2/3 fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative  my-6  max-h-screen max-w-2xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center flex-col justify-between py-2 px-4  border-solid border-slate-200 rounded-t">
                                <h3 className="text-2xl p-2  font-semibold"> {message} </h3>
                                <div className=" m-2 ">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={()=>{handleClick(false)}}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={()=>{handleClick(true)}}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={()=>{console.log("hola")}} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        );
}

