import { PlayerColor } from "../../Types"
import { discColorClass } from "../../function/color"

type GameInfosProps = {
    color: PlayerColor
    name: string
}

export function GameInfos ({color, name}: GameInfosProps) {
    return <div>
        <h2 className="flex" style={{gap: '.5rem'}} >Turn of {name} <div className={discColorClass(color)}/> to play</h2>
    </div>
}
