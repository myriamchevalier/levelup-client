import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getGames } from "../games/GameManager"
import { createEvent, updateEvent, getSingleEvent } from "./EventManager"

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [event, setState] = useState({})
    const { eventId } = useParams()
    
    useEffect(() => {
        getGames()
        .then((data) => setGames(data))
    }, [])

    useEffect(() => {
        if (eventId) {
            getSingleEvent(eventId).then((eventData) => {
                setState(
                    // Unpack response
                    {...eventData,
                    gameId: eventData.game.id}
                )
            })
        }
    },[eventId])

    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, event)          // Create copy
        newEvent[domEvent.target.name] = domEvent.target.value    // Modify copy
        setState(newEvent)                                 // Set copy as new state
    }


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{eventId? "Update Event" : "Schedule New Event"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ event.gameId }
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
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Date </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    if (eventId) {
                        updateEvent(event)
                            .then(()=> history.push("/events"))
                    } else{
                        createEvent(event)
                            .then(() => history.push("/events"))
                }}}
                className="btn btn-primary">Save Event</button>
        </form>
    )
}
