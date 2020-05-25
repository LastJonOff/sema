import React, {useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'

export const LinksList = ({ links, handle }) => {

    const {request} = useHttp()
    const auth = useContext(AuthContext)


    if (!links.length) {
        return <p className="center">Ссылок пока нет</p>
    }



    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная</th>
                <th>Сокращенная</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Открыть</Link>
                        </td>
                        <td><button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={(e) => handle(link._id)}
                        >
                            x
                        </button></td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}