type CounterState = {
  totalRequests: number;
};

const state: CounterState = {
  totalRequests: 0
};

export const incrementRequestCount = (): void => {
  state.totalRequests += 1;
};

export const getRequestCount = (): number => {
  return state.totalRequests;
};