import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";

export const MyPage = () => {

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            Cabinet
        </div>
    )
}