'use client'

import { useEffect, useState } from "react"

export default function HomePage () {

    const [presupuesto, setPresupuesto] = useState(0)
    const [wasteName, setWasteName] = useState("")
    const [wasteValue, setWasteValue] = useState("")
    const [wastes, setWastes] = useState([])
    const [menuVisibility, setMenuVisibility] = useState(false)
    const [totalWaste, setTotalWaste] = useState(0)
    const [overLimit, setOverLimit] = useState(false)

    const toggleMenu = () => {
        setMenuVisibility(!menuVisibility)
    }
    const toggleMenuLimit = () => {
        setOverLimit(!overLimit)
    }
    const reset = () => {
        setPresupuesto(0)
        setTotalWaste(0)
        setWastes([])
        setOverLimit(false)
    }
    const updateBudget = (e) => {
        setPresupuesto(e.target.value)
    }
    const addWaste = async (e) => {
        if (wasteName.length > 0 && wasteValue > 0) {
            setWastes([...wastes, wasteName + " " + wasteValue + "$"])
            setTotalWaste(totalWaste + parseInt(wasteValue))
            setWasteName("")
            setWasteValue("")
            e.preventDefault()
        }
    }
    useEffect(() => {
        if (totalWaste > parseInt(presupuesto)) {   
            setOverLimit(true)
        }
    })
    const updateWasteName = (e) => {
        setWasteName(e.target.value)
    }
    const updateWasteValue = (e) => {
        setWasteValue(e.target.value)
    }
    return (
        <main>
            <div className="box">
                <form className="waste" onSubmit={addWaste}>
                    <h2>Gasto</h2>
                    <input type="text" placeholder="Nombre del gasto" value={wasteName} onChange={updateWasteName} />
                    <input type="text" placeholder="Gasto" value={wasteValue} onChange={updateWasteValue} />
                    <input type="submit" value="Añadir" />
                </form>
                <div className="total-waste">
                        <ul>
                            {wastes.length > 0 ? wastes.map(el => {
                                return <li key={el}>{el}</li>
                            }) : ""}
                        </ul>
                        Gasto: {totalWaste}$<br/>
                        {presupuesto > 0 ? <span className="budget">Presupuesto: {presupuesto}$</span> : "No has puesto un presupuesto"}
                </div>
            </div>
            {menuVisibility ? 
                <>
                <div className="graybg"/>
                <form className="menu" onSubmit={(e) => {e.preventDefault()}}>
                    <h2>Nuevo presupuesto</h2>
                    <input type="text" placeholder="Cantidad $" value={presupuesto > 0 ? presupuesto : ""} onChange={updateBudget} />
                    <input type="submit" value="Añadir" onClick={toggleMenu} className="change"/>
                </form></> : ""}
            {overLimit ? <><div className="graybg"/>
                <form className="menu" onSubmit={(e) => {e.preventDefault()}}>
                <h2>Has pasado el limite!</h2>
                Por {totalWaste - presupuesto}$
                <input type="text" placeholder="Cantidad $" value={presupuesto > 0 ? presupuesto : ""} onChange={updateBudget} />
                <input type="submit" value="Cambiar presupuesto" onClick={toggleMenuLimit} className="change" />
                <input type="submit" value="Reiniciar presupuesto" onClick={reset} className="reiniciar" />
                </form></> 
            : ""}
                <button onClick={toggleMenu}>
                    Nuevo presupuesto
                </button>
        </main>
    )
}