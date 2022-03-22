import { useEffect } from "react"
import { IADCScopedSBTState, updateStateFunction } from "./App"

interface ISBTState extends IADCScopedSBTState {
    sceneOne: {
        textInputOne: string,
        arrayOne: number[],
        textInputTwo: string
    },
    sceneTwo: {
        textInputOne: string,
        isSomeRandomDrawerOpen: boolean,
        someComplexObject: {
            [k: string]: boolean
        }
    }
}

interface SBTProps {
    updateState: updateStateFunction<ISBTState>
}

const initialState: ISBTState = {
    sceneOne: {
        textInputOne: "",
        arrayOne: [],
        textInputTwo: ""
    },
    sceneTwo: {
        textInputOne: "",
        isSomeRandomDrawerOpen: false,
        someComplexObject: {}
    }
}

export function SBT({ updateState }: SBTProps) {
    // initialize our state when we first load
    useEffect(() => {
        updateState(_ => {
            return initialState;
        })
    }, [])

    function handleButtonClick() {
        updateState(draft => {
            // typescript baby!
            draft.sceneOne.arrayOne.push(5);
        })
    }


    return <div>Cool I'm an SBT. <button onClick={handleButtonClick}>Click this button</button>to push to the array in state</div>
}