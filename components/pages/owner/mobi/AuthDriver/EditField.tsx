import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { AddFieldForm } from '../../../../organisms/AddFieldForm';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { TranslationNames } from '../../../../../locales/TranslationNames';

export function EditField({
  navigation,
  route: {
    params: { field, client },
  },
}: AuthDriverProps<'editField'>) {
  return (
    <ScreenBase
      name={t(TranslationNames.screens.authDriver.createField.editScreenTitle)}
    >
      <AddFieldForm client={client} navigation={navigation} field={field} />
    </ScreenBase>
  );
}
