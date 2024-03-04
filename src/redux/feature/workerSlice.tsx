import { createSlice } from '@reduxjs/toolkit';
import { WorkerIdResponseBase } from '../../../FarmServiceApiTypes/Worker/Responses';
import { MainStoreI } from '../app/Store';

export type WorkerSliceI = {
  worker: {
    data: WorkerIdResponseBase | null;
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
    setWorker: (state, action) => {
      if (state.worker.data === null)
        // eslint-disable-next-line no-param-reassign
        state.worker.data = action.payload;
    },
  },
});
export const selectWorker = (state: MainStoreI) => state.worker.worker.data;
export const { setWorker } = WorkerSlice.actions;
export default WorkerSlice.reducer;
