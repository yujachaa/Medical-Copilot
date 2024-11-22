import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoordinatesGroup } from '@/types/report';

interface CoordinateState {
  coordinates: CoordinatesGroup[];
}

const initialState: CoordinateState = {
  coordinates: [],
};

const coordinateSlices = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {
    setCoordinates: (state, action: PayloadAction<CoordinatesGroup[]>) => {
      state.coordinates = action.payload;
    },
    clearCoordinates: (state) => {
      state.coordinates = [];
    },
  },
});

export const { setCoordinates, clearCoordinates } = coordinateSlices.actions;
export default coordinateSlices;
