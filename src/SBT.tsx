import { ChangeEvent, FormEvent, useEffect } from "react";
import { IADCScopedSBTState, updateStateFunction } from "./App";

interface ISBTState extends IADCScopedSBTState {
  sceneOne: {
    textInputOne: string;
    arrayOne: number[];
    textInputTwo: string;
  };
  sceneTwo: {
    textInputOne: string;
    isSomeRandomDrawerOpen: boolean;
    someComplexObject: {
      [k: string]: boolean;
    };
  };
}

interface SBTProps {
  updateState: updateStateFunction<ISBTState>;
  state: ISBTState;
}

const initialState: ISBTState = {
  sceneOne: {
    textInputOne: "",
    arrayOne: [],
    textInputTwo: "",
  },
  sceneTwo: {
    textInputOne: "",
    isSomeRandomDrawerOpen: false,
    someComplexObject: {},
  },
};

export function SBT({ updateState, state }: SBTProps) {
  // initialize our state when we first load
  useEffect(() => {
    updateState((_) => {
      return initialState;
    });
  }, []);

  function handleButtonClick() {
    updateState((draft) => {
      // typescript baby!
      draft.sceneOne.arrayOne.push(5);
    });
  }

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    updateState((draft) => {
      draft.sceneOne.textInputOne = e.target.value;
    });
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        Cool I'm an SBT.{" "}
        <button
          onClick={handleButtonClick}
          style={{ padding: "1rem", fontSize: "24px", marginRight: ".5rem" }}
        >
          Click this button
        </button>
        to push to the array in state.
      </div>
      <div>
        <input
          type="text"
          name="text-input-one"
          id="text-input-one"
          value={state?.sceneOne?.textInputOne || ""}
          onChange={handleTextInputChange}
          style={{ padding: "1rem", marginBottom: "1rem", fontSize: "24px" }}
        />
      </div>
      <div>
        <span>Below you will see any of the entries in our state array</span>
        <ul>
          {state?.sceneOne?.arrayOne?.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
