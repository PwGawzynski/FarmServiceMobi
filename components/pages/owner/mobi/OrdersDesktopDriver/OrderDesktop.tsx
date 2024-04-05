import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { OrderList } from '../../../../organisms/OrdersList';

export function OrderDesktop() {
  // const company = useSelector(selectUserCompany);
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <ScreenBase
      name="orders"
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <OrderList bottomSheetRef={modalRef} />
    </ScreenBase>
  );
}
