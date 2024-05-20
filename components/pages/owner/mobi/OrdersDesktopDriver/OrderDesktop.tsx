import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { getAllOrders } from '../../../../../api/Order/Order';
import { filterOrder } from '../../../../../helepers/filterFunctions';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import List from '../../../../organisms/List';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATIONS = {
  title: t(TranslationNames.screens.ordersDesktopDriver.orderDesktop.title),
  searchOrder: t(
    TranslationNames.screens.ordersDesktopDriver.orderDesktop.searchPlaceholder,
  ),
  emptyList: t(
    TranslationNames.screens.ordersDesktopDriver.orderDesktop.emptyList,
  ),
};

export function OrderDesktop() {
  // const company = useSelector(selectUserCompany);
  const modalRef = useRef<BottomSheetModal>(null);
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });
  return (
    <ScreenBase
      name={TRANSLATIONS.title}
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
        onPressNavigateTo="orderControlPanel"
        navigationParamName="order"
        swipeRightAnimation
        listEmptyText="No orders found, swipe left to create new order"
        listStyleSettings={item => ({
          header: item.name,
          bottomRightText: ` DATE: ${new Date(
            item.performanceDate,
          ).toLocaleDateString()}`,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={filterOrder}
        searchEnginePlaceholder={TRANSLATIONS.searchOrder}
      />
    </ScreenBase>
  );
}
