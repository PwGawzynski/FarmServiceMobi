import React, { createContext, Dispatch, SetStateAction } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface WorkerModalContextProps {
  modalRef: React.RefObject<BottomSheetModal> | undefined;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const WorkerModalContext = createContext<
  WorkerModalContextProps | undefined
>(undefined);
