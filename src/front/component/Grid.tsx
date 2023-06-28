import { CSSProperties } from "react";
import { CellState, GridSate, PlayerColor } from "../../Types";
import { discColorClass } from "../../function/color";
import { prevent } from "../../function/dom";

type GridProps = {
    grid: GridSate
    color?: PlayerColor
    onDrop?: (x: number) => void
}

type CellProps = {
    y: number
    color: CellState
}

type ColumnProps = {
    color: PlayerColor
    onDrop: () => void
}

export function Grid ({grid, color, onDrop}: GridProps) {
    const cols = grid[0].length
    const showCols = color && onDrop

    return <div className="grid" style={{'--rows': grid.length, '--cols': cols} as CSSProperties}>
        {grid.map((row, y) => row.map((c, x) => <Cell y={y} color={c} key={`${x}-${y}`} />))}
        {showCols && <div className="columns">
            {new Array(cols).fill(1).map((_, k) => <Column onDrop={() => onDrop(k)} color={color} key={k}/>)}
        </div>}
    </div>
}

function Cell ({y, color}: CellProps) {
    return <div
    style={{'--row': y} as CSSProperties}
    className={discColorClass(color)}/>
}

function  Column ({color, onDrop}: ColumnProps) {
    return <button onClick={prevent(onDrop)} className="column">
        <div className={discColorClass(color)} ></div>
    </button>
}
