import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {Link} from "react-router-dom";

export const QuestionsPage = () => {

    const [questions, setQuestions] = useState([])
    const {loading, request} = useHttp()

    const fetchQuestions = useCallback(async () => {
        try {
            const fetched = await request('/api/questions', 'GET', null)
            setQuestions(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchQuestions()
    }, [fetchQuestions])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            { questions.map((quest) => {
                return (
                    <div className="row" key={quest._id}>
                        <div className="col s6 message received">
                            <p className="left-align">Q: {quest.question}</p>
                        </div>
                        <div className="col s6 offset-s6 message sent">
                            <p className="right-align">A: {quest.answer}</p>
                        </div>
                    </div>
                )
            }) }
        </>
    )
}