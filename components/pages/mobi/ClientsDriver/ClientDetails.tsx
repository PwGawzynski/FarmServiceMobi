import { Card, SizableText, XStack, YStack } from 'tamagui';
import { t } from 'i18next';
import { ClientsDriverScreenProps } from '../../../../types/self/navigation/props/clients/ClientsDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { KeyValuePair } from '../../../atoms/KeyValuePair';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { CallAndMailPanel } from '../../../molecules/CallAndMailPanel';

export function ClientDetails({
  route,
}: ClientsDriverScreenProps<
  'clientDetails',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const { personal_data: personalData, address } = route.params.client.user;
  const { company, email } = route.params.client;
  return (
    <ScreenBase name={`${personalData.name} ${personalData.surname}`}>
      <YStack f={1}>
        <Card bordered p="$2" mt="$4">
          <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
            {t(TranslationNames.screens.authDriver.clientDetails.personalData)}
          </SizableText>
          <KeyValuePair
            name={t(
              TranslationNames.createClientForm.formPlaceholder.phoneNumber,
            )}
            value={personalData.phone_number}
          />
        </Card>
        <Card bordered p="$2" mt="$4">
          <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
            {t(TranslationNames.screens.authDriver.clientDetails.address)}
          </SizableText>
          <KeyValuePair
            name={t(TranslationNames.addressForm.formPlaceholder.city)}
            value={address.city}
          />
          <KeyValuePair
            name={t(TranslationNames.addressForm.formPlaceholder.county)}
            value={address.county}
          />
          <KeyValuePair
            name={t(
              TranslationNames.addressForm.formPlaceholder.apartmentNumber,
            )}
            value={address.apartmentNumber}
          />
          <KeyValuePair
            name={t(TranslationNames.addressForm.formPlaceholder.houseNumber)}
            value={address.houseNumber}
          />
          <KeyValuePair
            name={t(TranslationNames.addressForm.formPlaceholder.postalCode)}
            value={address.postalCode}
          />
          <KeyValuePair
            name={t(TranslationNames.addressForm.formPlaceholder.street)}
            value={address.street}
          />
          <KeyValuePair
            name={t(TranslationNames.addressForm.formPlaceholder.voivodeship)}
            value={address.voivodeship}
          />
        </Card>
        {company && (
          <Card bordered p="$2" mt="$4">
            <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
              {t(TranslationNames.screens.authDriver.clientDetails.companyData)}
            </SizableText>
            <KeyValuePair
              name={t(TranslationNames.createCompanyForm.formPlaceholder.name)}
              value={company?.name}
            />
            <KeyValuePair
              name={t(TranslationNames.createCompanyForm.formPlaceholder.NIP)}
              value={company?.NIP}
            />
            <KeyValuePair
              name={t(TranslationNames.createCompanyForm.formPlaceholder.email)}
              value={company?.email}
            />
            <KeyValuePair
              name={t(
                TranslationNames.createCompanyForm.formPlaceholder.phoneNumber,
              )}
              value={company?.phoneNumber}
            />
            <SizableText
              textTransform="uppercase"
              size="$4"
              fontWeight="bold"
              mt="$3"
              mb="$2"
            >
              {t(
                TranslationNames.screens.authDriver.clientDetails
                  .companyAddress,
              )}
            </SizableText>
            <KeyValuePair
              name={t(TranslationNames.addressForm.formPlaceholder.city)}
              value={company?.address.city}
            />
            <KeyValuePair
              name={t(TranslationNames.addressForm.formPlaceholder.county)}
              value={company?.address.county}
            />
            <KeyValuePair
              name={t(
                TranslationNames.addressForm.formPlaceholder.apartmentNumber,
              )}
              value={company?.address.apartmentNumber}
            />
            <KeyValuePair
              name={t(TranslationNames.addressForm.formPlaceholder.houseNumber)}
              value={company?.address.houseNumber}
            />
            <KeyValuePair
              name={t(TranslationNames.addressForm.formPlaceholder.postalCode)}
              value={company?.address.postalCode}
            />
            <KeyValuePair
              name={t(TranslationNames.addressForm.formPlaceholder.street)}
              value={company?.address.street}
            />
            <KeyValuePair
              name={t(TranslationNames.addressForm.formPlaceholder.voivodeship)}
              value={company?.address.voivodeship}
            />
          </Card>
        )}
      </YStack>
      <XStack mt="$4">
        <CallAndMailPanel
          callButtonProps={{ phoneNumber: personalData.phone_number }}
          mailButtonProps={{
            emailOptions: {
              body: 'Send from FarmService T.M',
              recipients: [email],
            },
          }}
        />
      </XStack>
    </ScreenBase>
  );
}
