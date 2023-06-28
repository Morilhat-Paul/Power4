import { ContextFrom, EventFrom } from "xstate"
import { GameModel } from "./machine/Game_machine"

export enum PlayerColor {
    RED = "R",
    YELLOW  = "Y"
}

export enum GameStates {
    LOBBY = 'LOBBY',
    PLAY = 'PLAY',
    WIN = 'WIN',
    DRAW = 'DRAW'
}

export type Positions = {
    x: number,
    y: number
}


export type Player = {
    id: string,
    name: string,
    color?: PlayerColor
}

export type CellEmpty = "E"
export type CellState = PlayerColor | CellEmpty
export type GridSate = CellState[][]
export type GameContext = ContextFrom<typeof GameModel>
export type GameEvents = EventFrom<typeof GameModel>

export type GameEvent<T extends GameEvents["type"]> = GameEvents & {type: T}
export type GameGuard<T extends GameEvents["type"]> = (
    context: GameContext,
    event: GameEvent<T>
) => boolean
export type GameAction<T extends GameEvents["type"]> = (
    context: GameContext,
    event: GameEvent<T>
) => Partial<GameContext>
