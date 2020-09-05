import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {QuestionsPage} from "./pages/QuestionsPage";
import {CoursePage} from "./pages/CoursePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {NewsPage} from "./pages/NewsPage";
import {MyPage} from "./pages/MyPage";
import {CreatePage} from "./pages/CreatePage";

export const useRoutes = isAuthenticated =>{
    if (isAuthenticated){
        return(
            <Switch>
                <Route path = "/questions" exact>
                    <QuestionsPage />
                </Route>
                <Route path = "/courses" exact>
                    <CoursePage />
                </Route>
                <Route path = "/create" exact>
                    <CreatePage />
                </Route>
                <Route path = "/news" exact>
                    <NewsPage />
                </Route>
                <Route path = "/cabinet" exact>
                    <MyPage />
                </Route>
                <Route path = "/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to = "/news"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path ="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to = "/"/>
        </Switch>
    )
}