import { navigate as reachNavigate } from "@reach/router";

let _stack = [window.location.pathname];

let navigate = (path: string) => {
  _stack.push(path);
  reachNavigate(path);
};

let goBack = (fallback: string) => {
  _stack.pop();
  console.log();
  if (_stack.length < 1) {
    if (fallback) reachNavigate(fallback);
    return;
  } else {
    reachNavigate(_stack[_stack.length - 1]);
  }
  return;
};

export default function useNavigation() {
  return { navigate, goBack };
}
