import React, { useState, useEffect } from "react"
import { getGames } from "./GameManager.js"
import { useHistory } from "react-router"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="btn btn-2" 
                            onClick={()=> {
                                history.push({ pathname: `/games/edit/${game.id}`})
                            }}>Edit</button>
                    </section>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/create" })
                }}
            >Register New Game</button>
        </article>
    )
}
