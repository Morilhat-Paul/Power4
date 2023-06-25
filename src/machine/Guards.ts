/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GameGuard, PlayerColor } from '../Types'
import { countEmptyCells, curentPlayer, freePositionY, winningPositions } from '../function/game'

export const CanJoinGuard: GameGuard<"join"> = (context, event) => {
    return context.players.length < 2 && context.players.find(p => p.id == event.PlayerId) == undefined
}

export const CanLeaveGuard: GameGuard<"leave"> = (context, event) => {
    return !!context.players.find(p => p.id == event.PlayerId)
}

export const CanChooseColorGuard: GameGuard<"chooseColor"> = (context, event) => {
    return [PlayerColor.RED, PlayerColor.YELLOW, undefined].includes(event.color) &&
        context.players.find(p => p.id == event.PlayerId) !== undefined &&
        context.players.find(p => p.color == event.color) == undefined
}

export const canStartGameGuard: GameGuard<"start"> = (context) => {
    return context.players.filter(p => p.color).length == 2
}

export const canDropTokenGuard: GameGuard<"dropToken"> = (context, event) => {
    return event.x < context.grid[0].length &&
        event.x >= 0 &&
        context.currentPlayer == event.PlayerId &&
        freePositionY(context.grid, event.x) >= 0
}

export const isWinningMoveGuard: GameGuard<"dropToken"> = (context, event) => {
    return canDropTokenGuard(context, event) && winningPositions(
        context.grid,
        curentPlayer(context).color!,
        event.x,
        context.rowLLenght
    ).length > 0
}

export const isDrawMoveGuard: GameGuard<"dropToken"> = (context, event) => {
    return canDropTokenGuard(context, event) &&
        countEmptyCells(context.grid) <= 1
}
