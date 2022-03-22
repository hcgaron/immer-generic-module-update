import { ChangeEvent, FormEvent, useEffect } from "react";
import { JSONTree } from "react-json-tree";
import { IADCScopedSBTState, updateStateFunction } from "./App";

interface ISBTState extends IADCScopedSBTState {
  sceneOne: {
    textInputOne: string;
    arrayOne: number[];
    textInputTwo: string;
    textInputOneDivVisible: boolean;
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
    textInputOneDivVisible: false,
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

  return state.sceneOne ? (
    <div style={{ padding: "1rem" }}>
      <p>
        Cool I'm an SBT.{" "}
        <button
          onClick={handleButtonClick}
          style={{ padding: "1rem", fontSize: "24px", marginRight: ".5rem" }}
        >
          Click this button
        </button>
        to push to the array in state.
      </p>
      <div style={{ position: "relative" }}>
        <p>
          Below is a fully controlled text input. Typing in this input will
          update{" "}
          <span
            onMouseEnter={() =>
              updateState((draft) => {
                draft.sceneOne.textInputOneDivVisible = true;
              })
            }
            onMouseLeave={() =>
              updateState((draft) => {
                draft.sceneOne.textInputOneDivVisible = false;
              })
            }
            style={{
              fontFamily: "monospace",
              border: "1px solid #aaa",
              backgroundColor: "#ccc",
              padding: ".2rem",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            state.sceneOne.textInputOne.
          </span>
        </p>
        <p>
          Try hovering over the above code snippet to see the current state.
        </p>
        <div
          style={{
            position: "absolute",
            top: "25%",
            right: "25%",
            fontFamily: "monospace",
            padding: "1rem",
            display: state.sceneOne.textInputOneDivVisible ? "block" : "none",
          }}
        >
          <JSONTree data={state} shouldExpandNode={() => true} />
        </div>
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
        <p>Below you will see any of the entries in our state array</p>
        <ul>
          {state?.sceneOne?.arrayOne?.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}
