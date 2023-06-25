import { createModel } from 'xstate/lib/model'
import { InterpreterFrom, interpret } from 'xstate';
import { GameContext, GameStates, GridSate, Player, Positions } from '../Types';
import { CanChooseColorGuard, CanJoinGuard, CanLeaveGuard, canDropTokenGuard, canStartGameGuard, isDrawMoveGuard, isWinningMoveGuard } from './Guards';
import { dropTokenAction, joinGameAction, leaveGameAction, saveWinningPositionsAction, switchPlayerAction, setCurentPlayerAction, restartAction, chooseColorAction } from './Action';

export const GameModel = createModel({
    players: [] as Player[],
    currentPlayer: null as null | Player['id'],
    rowLLenght: 4,
    winingPositions: [] as Positions[],
    grid: [
        ["E", "E", "E", "E", "E", "E", "E"],
        ["E", "E", "E", "E", "E", "E", "E"],
        ["E", "E", "E", "E", "E", "E", "E"],
        ["E", "E", "E", "E", "E", "E", "E"],
        ["E", "E", "E", "E", "E", "E", "E"],
        ["E", "E", "E", "E", "E", "E", "E"]
    ] as GridSate
}, {
    events: {
        join: (PlayerId: Player['id'], name: Player['name']) => ({PlayerId, name}),
        leave: (PlayerId: Player['id']) => ({PlayerId}),
        chooseColor: (PlayerId: Player['id'], color: Player['color']) => ({PlayerId, color}),
        start: (PlayerId: Player['id']) => ({PlayerId}),
        dropToken: (PlayerId: Player['id'], x: number) => ({PlayerId, x}),
        restart: (PlayerId: Player['id']) => ({PlayerId})

    }
});

export const GameMachine = GameModel.createMachine({
    id: 'game',
    predictableActionArguments: true,
    context: GameModel.initialContext,
    initial: GameStates.LOBBY,
    states: {
        [GameStates.LOBBY]: {
            on: {
                join: {
                    cond: CanJoinGuard,
                    actions: [GameModel.assign(joinGameAction)],
                    target: GameStates.LOBBY
                },
                leave: {
                    cond: CanLeaveGuard,
                    actions: [GameModel.assign(leaveGameAction)],
                    target: GameStates.LOBBY
                },
                start: {
                    cond: canStartGameGuard,
                    actions: [GameModel.assign(setCurentPlayerAction)],
                    target: GameStates.PLAY
                },
                chooseColor: {
                    cond: CanChooseColorGuard,
                    actions: [GameModel.assign(chooseColorAction)],
                    target: GameStates.LOBBY
                }
            }
        },
        [GameStates.PLAY]: {
            on: {
                dropToken: [
                    {
                        cond: isDrawMoveGuard,
                        actions: [GameModel.assign(dropTokenAction)],
                        target: GameStates.DRAW
                    },
                    {
                        cond: isWinningMoveGuard,
                        actions: [GameModel.assign(saveWinningPositionsAction), GameModel.assign(dropTokenAction)],
                        target: GameStates.WIN
                    },
                    {
                        cond: canDropTokenGuard,
                        actions: [GameModel.assign(dropTokenAction), GameModel.assign(switchPlayerAction)],
                        target: GameStates.PLAY
                    }
                ]
            }
        },
        [GameStates.WIN]: {
            on: {
                restart: {
                    actions: [GameModel.assign(restartAction)],
                    target: GameStates.LOBBY
                }
            }
        },
        [GameStates.DRAW]: {
            on: {
                restart: {
                    actions: [GameModel.assign(restartAction)],
                    target: GameStates.LOBBY
                }
            }
        }
    }
})

export function makeGame (state: GameStates = GameStates.LOBBY, context: Partial<GameContext> = {}): InterpreterFrom<typeof GameMachine> {
    const Machine = interpret(
        GameMachine.withContext({
            ...GameModel.initialContext,
            ...context
        })
    ).start()
    Machine.state.value = state

    return Machine
}
