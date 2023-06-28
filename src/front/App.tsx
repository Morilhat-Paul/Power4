import { GridSate, PlayerColor } from "../Types"
import { ColorSelector } from "./component/ColorSelector"
import { NameSelector } from "./component/NameSelector"
import { Grid } from "./component/Grid";
import { GameInfos } from "./component/GameInfos";
import { Victory } from "./component/Victory";

function App() {

    return (
        <div className='container'>
            <NameSelector onSelect={() => null}/>
            <hr />
            <ColorSelector onSelect={() => null} players={[{
                id: '1',
                name: 'Paul',
                color: PlayerColor.RED
            }, {
                id: '2',
                name: 'Antoine',
                color: PlayerColor.YELLOW
            }]} colors={[PlayerColor.YELLOW, PlayerColor.RED]} />
            <hr />
            <GameInfos color={PlayerColor.RED} name="Paul" />
            <Victory color={PlayerColor.RED} name="Paul" />
            <Grid
            onDrop={() => null}
            color={PlayerColor.RED}
            grid={[
                ["E", "E", "E", "E", "E", "E", "R"],
                ["E", "E", "E", "E", "E", "R", "Y"],
                ["E", "E", "E", "E", "E", "R", "R"],
                ["E", "E", "E", "E", "E", "R", "Y"],
                ["E", "E", "E", "E", "E", "Y", "R"],
                ["E", "E", "E", "E", "E", "Y", "Y"]
            ] as GridSate} />
        </div>
    )
}

export default App
