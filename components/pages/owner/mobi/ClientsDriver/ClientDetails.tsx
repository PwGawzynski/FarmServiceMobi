import { Card, SizableText, XStack, YStack } from 'tamagui';
import { t } from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import PenIco from '../../../../../assets/pen.svg';
import { KeyValuePair } from '../../../../atoms/KeyValuePair';
import { CallAndMailPanel } from '../../../../molecules/CallAndMailPanel';

export function ClientDetails({
  route,
  navigation,
}: ClientsDriverScreenProps<
  'clientDetails',
  'clientsDriver',
  'ownerRootDriver'
>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = useNavigation<any>();

  const { personal_data: personalData, address } = route.params.client.user;
  const { company, email } = route.params.client;
  return (
    <ScreenBase name={`${personalData.name} ${personalData.surname}`}>
      <YStack f={1}>
        <Card bordered p="$2" mt="$4">
          <XStack jc="space-between" ai="center">
            <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
              {t(
                TranslationNames.screens.clientDriver.clientDetails
                  .personalData,
              )}
            </SizableText>
            <ButtonTamagui
              icon={<PenIco height="70%" />}
              text={t(
                TranslationNames.screens.clientDriver.clientDetails.editButton,
              )}
              buttonProps={{
                size: '$2',
                onPress: () => {
                  nav.navigate('createClient', {
                    client: route.params.client,
                  });
                },
              }}
            />
          </XStack>
          <KeyValuePair
            name={t(
              TranslationNames.createClientForm.formPlaceholder.phoneNumber,
            )}
            value={personalData.phoneNumber}
          />
        </Card>
        <Card bordered p="$2" mt="$4">
          <XStack jc="space-between" ai="center">
            <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
              {t(TranslationNames.screens.clientDriver.clientDetails.address)}
            </SizableText>
            <ButtonTamagui
              icon={<PenIco height="70%" />}
              text={t(
                TranslationNames.screens.clientDriver.clientDetails.editButton,
              )}
              buttonProps={{
                size: '$2',
                onPress: () =>
                  nav.navigate('createClient', {
                    client: route.params.client,
                  }),
              }}
            />
          </XStack>
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
        <Card bordered p="$2" mt="$4">
          <XStack jc="space-between" ai="center">
            <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
              {t(
                TranslationNames.screens.clientDriver.clientDetails.companyData,
              )}
            </SizableText>
            <ButtonTamagui
              icon={<PenIco height="70%" />}
              text={
                company
                  ? t(
                      TranslationNames.screens.clientDriver.clientDetails
                        .editButton,
                    )
                  : t(
                      TranslationNames.screens.clientDriver.clientDetails
                        .assignCompanyButton,
                    )
              }
              buttonProps={{
                size: '$2',
                onPress: () => {
                  if (company)
                    navigation.navigate('assignCompanyToClient', {
                      onEdit: {
                        company,
                        client: route.params.client,
                      },
                    });
                  else
                    navigation.navigate('assignCompanyToClient', {
                      afterCreateClient: route.params.client,
                    });
                },
              }}
            />
          </XStack>
          {company && (
            <>
              <KeyValuePair
                name={t(
                  TranslationNames.createCompanyForm.formPlaceholder.name,
                )}
                value={company?.name}
              />
              <KeyValuePair
                name={t(TranslationNames.createCompanyForm.formPlaceholder.NIP)}
                value={company?.NIP}
              />
              <KeyValuePair
                name={t(
                  TranslationNames.createCompanyForm.formPlaceholder.email,
                )}
                value={company?.email}
              />
              <KeyValuePair
                name={t(
                  TranslationNames.createCompanyForm.formPlaceholder
                    .phoneNumber,
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
                  TranslationNames.screens.clientDriver.clientDetails
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
                name={t(
                  TranslationNames.addressForm.formPlaceholder.houseNumber,
                )}
                value={company?.address.houseNumber}
              />
              <KeyValuePair
                name={t(
                  TranslationNames.addressForm.formPlaceholder.postalCode,
                )}
                value={company?.address.postalCode}
              />
              <KeyValuePair
                name={t(TranslationNames.addressForm.formPlaceholder.street)}
                value={company?.address.street}
              />
              <KeyValuePair
                name={t(
                  TranslationNames.addressForm.formPlaceholder.voivodeship,
                )}
                value={company?.address.voivodeship}
              />
            </>
          )}
        </Card>
      </YStack>
      <XStack mt="$4">
        <CallAndMailPanel
          callButtonProps={{ phoneNumber: personalData.phoneNumber }}
          mailButtonProps={{
            emailOptions: {
              body: t(TranslationNames.components.CallAndMailPanel.sign),
              recipients: [email],
            },
          }}
        />
      </XStack>
    </ScreenBase>
  );
}
