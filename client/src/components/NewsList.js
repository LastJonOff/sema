import React from 'react'

export const NewsList = ({news}) => {

    if (!news.length) {
        return <p className="center">Не найдено ни одной новости</p>
    }

    return (
        <>
            { news.map((item) => {
                return (
                    <div className="container" key={item._id}>
                        <h2>{item.title}</h2>
                        <div className="divider"></div>
                        <p>{item.description}</p>
                    </div>
                )
              })
            }
        </>
    )
}