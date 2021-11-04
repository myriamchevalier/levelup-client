import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./events/EventList.js"
import { GameList } from "./games/GameList.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path = "/events">
                <EventList />
            </Route>
        </main>
    </>
}
