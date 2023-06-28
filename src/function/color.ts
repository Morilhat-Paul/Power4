import { CellState, PlayerColor } from "../Types";

export function discColorClass(color: CellState) {
    if (color == "E")
        return 'disc'
    return `disc disc-${color == PlayerColor.YELLOW ? 'yellow' : 'red'}`
}
