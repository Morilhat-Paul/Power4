/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GameAction, GameContext, GridSate, PlayerColor, } from '../Types'
import { freePositionY } from '../function/game'
import { winningPositions, curentPlayer } from '../function/game'
import { GameModel } from './Game_machine'

export const joinGameAction: GameAction<"join"> = (context, event) => ({
    players: [...context.players, {id: event.PlayerId, name: event.name}]
})

export const leaveGameAction: GameAction<"leave"> = (context, event) => ({
    players: context.players.filter(p => p.id !== event.PlayerId)
})

export const dropTokenAction: GameAction<"dropToken"> = ({grid, players}, {x: eventX, PlayerId}) => {
    const player = players.find(p => PlayerId == p.id);
    const PlayerColor = player ? player.color : "E";
    const eventY = freePositionY(grid, eventX)
    const newGrid = grid.map((row, y) => row.map((v, x) => (x == eventX && y == eventY) ? PlayerColor : v))

    return {
        grid: newGrid as GridSate
    }
}

export const switchPlayerAction = (context: GameContext) => ({
    currentPlayer: context.players.find(p => p.id != context.currentPlayer)?.id ?? undefined
})

export const saveWinningPositionsAction: GameAction<"dropToken"> = (context, event) => ({
    winingPositions: winningPositions(
        context.grid,
        curentPlayer(context).color!,
        event.x,
        context.rowLLenght
    )
})

export const restartAction: GameAction<"restart"> = (context) => ({
    winingPositions: context.winingPositions,
    grid: GameModel.initialContext.grid,
    currentPlayer: null
})

export const setCurentPlayerAction = (context: GameContext) => ({
    currentPlayer: context.players.find(p => p.id == PlayerColor.YELLOW)!.id
})

export const chooseColorAction: GameAction<"chooseColor"> = (context, event) => ({
    players: context.players.map(p => {
        if (p.id == event.PlayerId)
            return {...p, color: event.color}
        return p
    })
})
