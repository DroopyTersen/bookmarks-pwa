import { useEffect, useState, useCallback, useMemo, useReducer } from "react";
import Freezer from "freezer-js";

let _globalStates = {};

export const getGlobalState = function(key, initialState = {}) {
  if (!_globalStates[key]) {
    _globalStates[key] = new Freezer(initialState);
  }
  let freezer = _globalStates[key] as Freezer;

  return freezer.get();
};

export const useGlobalState = function<T, A>(
  key: string,
  initialState: T,
  modifiers: any,
  callerId? // Caller Id is used for debugging
) {
  if (!_globalStates[key]) {
    _globalStates[key] = new Freezer(initialState);
  }
  let freezer = _globalStates[key];

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  // Had to fix issue with Hot module loading not calling useEffect cleanup

  useEffect(() => {
    const handler = function(newState) {
      console.log("HANDLER");
      forceUpdate();
    };

    freezer.on("update", handler);

    return () => {
      freezer.off("update", handler);
    };
  }, [freezer]);

  // let actions = {};

  let actions = useMemo(() => {
    if (!modifiers) return {};

    return Object.keys(modifiers).reduce((actions, modifierName) => {
      actions[modifierName] = (...args) => modifiers[modifierName](freezer.get(), ...args);
      return actions;
    }, {});
  }, [freezer, modifiers]);

  return [freezer.get(), actions, freezer.get] as [T, A, () => T];
};
