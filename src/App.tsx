import { useReducer } from "react";
import "./App.css";
import { SBT } from "./SBT";
import { produce, Draft, castDraft } from "immer";

enum ActionTypes {
  UpdateSBTState,
}

type UpdateSBTStateAction = {
  type: ActionTypes.UpdateSBTState;
  payload: IADCScopedSBTState;
};

function createUpdateSBTStateAction(
  payload: IADCScopedSBTState
): UpdateSBTStateAction {
  return {
    type: ActionTypes.UpdateSBTState,
    payload,
  };
}

type Actions = UpdateSBTStateAction;

export interface IADCScopedSBTState {
  [k: string]: any;
}

// honestly, we don't even use the state here XD
function reducer(_state: IADCScopedSBTState, action: Actions) {
  switch (action.type) {
    case ActionTypes.UpdateSBTState:
      return action.payload;
  }
}

const initialState = {};

export type updateStateFunction<T> = (
  recipe: (draft: Draft<T>) => void
) => void;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function updateSBTState<IADCScopedSBTState>(
    recipe: updateStateFunction<IADCScopedSBTState>
  ) {
    const newState = produce(state, recipe);
    dispatch(createUpdateSBTStateAction(newState));
  }

  return (
    // maybe we have to do an `any` cast in the ADC side
    <SBT updateState={updateSBTState as any} state={state as any} />
  );
}

export default App;
