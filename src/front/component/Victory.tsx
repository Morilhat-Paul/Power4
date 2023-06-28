import { PlayerColor } from "../../Types"
import { discColorClass } from "../../function/color"
import { prevent } from "../../function/dom"

type VictoryProps = {
    color: PlayerColor
    name: string
    onRestart?: () => void
}

export function Victory ({color, name, onRestart}: VictoryProps) {
    return <div className="flex" style={{justifyContent: "space-between"}}>
        <h2 className="flex" style={{gap: '.5rem'}} >{name} <div className={discColorClass(color)}/> win, GG!</h2>
        <button className="button" onClick={prevent(onRestart)}>Start a new game</button>
    </div>
}
