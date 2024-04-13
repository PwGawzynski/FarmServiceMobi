import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { getAllOrders } from '../../../../../api/Order/Order';
import { filterOrder } from '../../../../../helepers/filterFunctions';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import List from '../../../../organisms/List';

export function OrderDesktop() {
  // const company = useSelector(selectUserCompany);
  const modalRef = useRef<BottomSheetModal>(null);
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });
  return (
    <ScreenBase
      name="orders"
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <List<OrderResponseBase>
        isFetching={isFetching}
        isError={isError}
        isLoading={isLoading}
        data={data}
        modalRef={modalRef}
        onPressNavigateTo="orderDetails"
        navigationParamName="order"
        listStyleSettings={item => ({
          header: item.name,
          bottomRightText: ` DATE: ${new Date(
            item.performanceDate,
          ).toLocaleDateString()}`,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={filterOrder}
        searchEnginePlaceholder="Search Order"
      />
    </ScreenBase>
  );
}
