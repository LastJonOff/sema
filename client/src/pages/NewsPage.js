import React, {useEffect} from 'react'

export const NewsPage = () => {

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    return (
        <div className="row">
            News page
        </div>
    )
}