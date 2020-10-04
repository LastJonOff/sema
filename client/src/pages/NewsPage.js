import React, {useEffect} from 'react'

export const NewsPage = () => {

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    return (
        <div className="row">
            Данный раздел находится в разработке, скоро продолжим вас радовать!
        </div>
    )
}