import React, {useContext, useEffect, useState} from 'react'

import {EditForm} from "../components/EditForm";

export const CreatePage = () => {

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
            <div className="row">
                <EditForm handleName = "create"/>
            </div>
    )
}