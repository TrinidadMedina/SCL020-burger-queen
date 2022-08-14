import React from 'react'

export function Confirm({ showConfirm, setShowConfirm, handleSendOrder, showConfirmReset, setShowConfirmReset, handleReset }) {

    const closeConfirm = () => {
        setShowConfirm(false)
    }
    const handleConfirm = () => {
        handleSendOrder()
    }
    const closeConfirmReset = () => {
        setShowConfirmReset(false)
    }
    const handleConfirmReset = () => {
        handleReset()
    }
    if (showConfirmReset) {
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto max-h-2/3 fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative  my-6  max-h-screen max-w-2xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center flex-col justify-between py-2 px-4  border-solid border-slate-200 rounded-t">
                                <h3 className="text-2xl p-2  font-semibold"> Confirmar cierre </h3>
                                <h1 className="text-xl m-2 ">¿Cerrar mesa?</h1>
                                <div className=" m-2 ">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={closeConfirmReset}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleConfirmReset}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>

        )
    } else if (showConfirm)
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto max-h-2/3 fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative  my-6  max-h-screen max-w-2xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center flex-col justify-between py-2 px-4  border-solid border-slate-200 rounded-t">
                                <h3 className="text-2xl p-2  font-semibold"> Confirmar order </h3>
                                <h1 className="text-xl m-2 ">¿Enviar a cocina?</h1>
                                <div className=" m-2 ">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={closeConfirm}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleConfirm}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>

        );
}

