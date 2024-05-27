import axios, { AxiosInstance } from 'axios/index';
import { DataFromXMLRes } from '../FarmServiceApiTypes/Field/Ressponses';
import { ResponseObject } from '../FarmServiceApiTypes/Respnse/responseGeneric';
import { query } from '../helepers/Api/QueryDriver';
// noinspection ES6ConvertRequireIntoImport
// eslint-disable-next-line @typescript-eslint/no-var-requires
const proj4 = require('proj4');

export class GeoPortalApi {
  private static axiosInstance: AxiosInstance;

  private static async initAxios() {
    GeoPortalApi.axiosInstance = axios.create({
      timeout: 5000,
      withCredentials: true,
    });
  }

  private static async getFiledArea(
    latitude: number,
    longitude: number,
  ): Promise<DataFromXMLRes | undefined> {
    const fieldHa = (
      await GeoPortalApi.axiosInstance.get(
        `https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow?SERVICE=WMS&request=GetFeatureInfo&version=1.3.0&layers=obreby,dzialki,geoportal&styles=&crs=EPSG:2180&bbox=${
          longitude + 0.01
        },${latitude + 0.01},${longitude + 0.02},${
          latitude + 0.02
        }&width=10&height=10&format=image/png&transparent=true&query_layers=geoportal&i=1&j=1&INFO_FORMAT=text/xml`,
      )
    ).data as unknown as string;

    return (
      await query<{ data: string }, ResponseObject<DataFromXMLRes>>({
        type: 'POST',
        path: 'field/xmlTranslate',
        data: { data: fieldHa },
      })
    )?.payload;
  }

  private static async getPlodId(
    latitude: number,
    longitude: number,
  ): Promise<string | false> {
    const plotId = (
      (
        await GeoPortalApi.axiosInstance.get(
          `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${latitude},${longitude}&result=teryt`,
        )
      ).data as unknown as string
    ).split('\n') as [string, string];
    return !Number.isNaN(Number(plotId[0])) && Number(plotId[0]) !== -1
      ? plotId[1]
      : false;
  }

  private static transformCords(longitude: string, latitude: string) {
    proj4.defs(
      'EPSG:2180',
      '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs',
    );

    const srcCrs = 'WGS84';

    const dstCrs = 'EPSG:2180';

    return proj4(proj4.defs(srcCrs), proj4.defs(dstCrs), [
      Number(longitude),
      Number(latitude),
    ]);
  }

  static async driver(longitude: string, latitude: string) {
    await GeoPortalApi.initAxios();
    const [longitudeTransformed, latitudeTransformed] =
      GeoPortalApi.transformCords(longitude, latitude);
    return GeoPortalApi.getFiledArea(longitudeTransformed, latitudeTransformed);
  }
}
