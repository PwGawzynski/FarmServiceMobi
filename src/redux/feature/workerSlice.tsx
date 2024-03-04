import { createSlice } from '@reduxjs/toolkit';
import { WorkerResponseBase } from '../../../FarmServiceApiTypes/Worker/Responses';
import { MainStoreI } from '../app/Store';

export type WorkerSliceI = {
  worker: {
    data: WorkerResponseBase | null;
  };
};

const worker: WorkerSliceI = {
  worker: {
    data: null,
  },
};
const WorkerSlice = createSlice({
  initialState: worker,
  name: 'worker',
  reducers: {
    setWorker: (state, action: { payload: WorkerResponseBase }) => {
      console.log(action.payload, 'tescior');
      if (state.worker.data === null)
        // eslint-disable-next-line no-param-reassign
        state.worker.data = action.payload;
    },
  },
});
export const selectWorker = (state: MainStoreI) => state.worker.worker.data;
export const { setWorker } = WorkerSlice.actions;
export default WorkerSlice.reducer;
