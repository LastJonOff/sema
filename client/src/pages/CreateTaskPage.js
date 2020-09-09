import React, {useContext, useEffect, useState} from 'react'

import {EditForm} from "../components/EditForm";

export const CreateTaskPage = () => {

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <EditForm handleName = "createtask"/>
        </div>
    )
}