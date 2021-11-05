import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../games/GameManager"
import { createEvent } from "./EventManager"

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
        getGames()
        .then((data) => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, currentEvent)          // Create copy
        newEvent[domEvent.target.name] = domEvent.target.value    // Modify copy
        setCurrentEvent(newEvent)                                 // Set copy as new state
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Date </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {
                        gameId: parseInt(currentEvent.gameId), 
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                    }
                    createEvent(event)
                    .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
