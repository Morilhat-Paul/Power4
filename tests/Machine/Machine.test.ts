import { beforeEach, describe, expect, it } from 'vitest'
import { InterpreterFrom, interpret } from 'xstate'
import { GameMachine, GameModel, makeGame } from '../../src/machine/Game_machine'
import { GameStates, GridSate, PlayerColor } from '../../src/Types'

describe("machine/GameMachine", () => {

    describe("join", () => {
        let Machine: InterpreterFrom<typeof GameMachine>

        beforeEach(() => {
            Machine = interpret(GameMachine).start()
        })

        it('should let a player join a game', () => {
            expect(Machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
            expect(Machine.state.context.players).toHaveLength(1)
            expect(Machine.send(GameModel.events.join("2", "2")).changed).toBe(true)
            expect(Machine.state.context.players).toHaveLength(2)
        })

        it('should not let a player join a game twice', () => {
            expect(Machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
            expect(Machine.send(GameModel.events.join("1", "1")).changed).toBe(false)
        })
    })

    describe('dropToken', () => {

        let Machine: InterpreterFrom<typeof GameMachine>

        beforeEach(() => {
            Machine = makeGame(GameStates.PLAY, {
                players: [{
                    id: '1',
                    name: '1',
                    color: PlayerColor.RED
                }, {
                    id: '2',
                    name: '2',
                    color: PlayerColor.YELLOW
                }],
                currentPlayer: '1',
                grid: [
                    ["E", "E", "E", "E", "E", "E", "R"],
                    ["E", "E", "E", "E", "E", "R", "Y"],
                    ["E", "E", "E", "E", "E", "R", "R"],
                    ["E", "E", "E", "E", "E", "R", "Y"],
                    ["E", "E", "E", "E", "E", "Y", "R"],
                    ["E", "E", "E", "E", "E", "Y", "Y"]
                ] as GridSate
            })
        })


        it('should let a player drop a token', () => {
            expect(Machine.send(GameModel.events.dropToken("1", 0)).changed).toBe(true)
            expect(Machine.state.context.grid[5][0]).toBe(PlayerColor.RED)
        })

        it('should not let a player drop a token on filled columns', () => {
            expect(Machine.send(GameModel.events.dropToken("1", 6)).changed).toBe(false)
        })

        it('should make a player win', () => {
            expect(Machine.send(GameModel.events.dropToken("1", 5)).changed).toBe(true)
            expect(Machine.state.value).toBe(GameStates.WIN)
            expect(Machine.state.context.winingPositions).toHaveLength(4)
        })

        it('should handle draw', () => {
            Machine = makeGame(GameStates.PLAY, {
                ...Machine.state.context,
                grid: [
                    ["E", "Y", "Y", "Y", "Y", "Y", "Y"],
                    ["Y", "Y", "Y", "Y", "Y", "Y", "Y"],
                    ["Y", "Y", "Y", "Y", "Y", "Y", "Y"],
                    ["Y", "Y", "Y", "Y", "Y", "Y", "Y"],
                    ["Y", "Y", "Y", "Y", "Y", "Y", "Y"],
                    ["Y", "Y", "Y", "Y", "Y", "Y", "Y"]
                ] as GridSate
            })

            expect(Machine.send(GameModel.events.dropToken("1", 0)).changed).toBe(true)
            expect(Machine.state.value).toBe(GameStates.DRAW)
        })

    })
})
