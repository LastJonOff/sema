import React, {useEffect} from 'react'

export const CabinetPage = () => {

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    return (
        <div className="row">
            Cabinet page
        </div>
    )
}