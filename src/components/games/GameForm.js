import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getSingleGame, updateGame } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setState] = useState({})
    const { gameId } = useParams()
    const editMode = gameId ? true : false

    // Tracks transient state

    useEffect(() => {
        getGameTypes()
        .then((data) => setGameTypes(data))
    }, [])

    useEffect(() => {
        if (editMode) {
            getSingleGame(gameId).then((gameData) => {
                setState(
                    // Unpack the response, then match the back-end naming to front-end
                    {...gameData,      
                    skillLevel: gameData.skill_level,
                    numberOfPlayers: gameData.number_of_players,
                    gameTypeId: gameData.game_type.id}
                )
            })
        }
    }, [])


    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newGame = Object.assign({}, game)          // Create copy
        newGame[event.target.name] = event.target.value         // Modify copy
        setState(newGame)                                 // Set copy as new state
    }

    const constructNewGame = () => {
        if (editMode) {
            updateGame(game)
                .then(() => history.push('/'))
        } else {
            createGame(game)
                .then(() => history.push("/"))
        }

        // Send POST request to your API
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{editMode ? "Update Game" : "Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={game.gameTypeId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(gt => (
                                <option key={gt.id} value={gt.id}>
                                    {gt.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={game.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={game.skillLevel}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    constructNewGame()
                }}
                className="btn btn-primary">Save game</button>
        </form>
    )
}
