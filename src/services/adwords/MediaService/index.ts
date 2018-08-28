import { pd } from 'pretty-data';

import { AdwordsOperartionService, SoapService } from '../../core';
import { IMediaPage } from './MediaPage';
import { ISelector } from '../../../types/adwords';
import { IAudio, IImage, IVideo, IMediaBundle } from './Media';

class MediaService extends AdwordsOperartionService {
  private static readonly selectorFields: string[] = [
    'AdvertisingId',
    'CreationTime',
    'Dimensions',
    'DurationMillis',
    'FileSize',
    'IndustryStandardCommercialIdentifier',
    'MediaId',
    'MimeType',
    'Name',
    'ReadyToPlayOnTheWeb',
    'ReferenceId',
    'SourceUrl',
    'StreamingUrl',
    'Type',
    'Urls',
    'YouTubeVideoIdString',
  ];
  private soapService: SoapService;
  constructor(options: { soapService: SoapService }) {
    super();
    this.soapService = options.soapService;
  }

  public base64Encode(file: Buffer) {
    return new Buffer(file).toString('base64');
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: MediaService.selectorFields,
    };
    return this.get(serviceSelector);
  }

  public async upload<Media = Array<IAudio | IImage | IVideo | IMediaBundle>>(medias: Media[]) {
    const client = await this.soapService.getClient();
    return client.uploadAsync({ media: medias[0] }).then((rval: Array<IAudio | IImage | IVideo | IMediaBundle>) => {
      console.log('upload media successfully. rval: ', rval);
      return rval;
    });
  }

  protected async get<ServiceSelector = ISelector, Rval = IMediaPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      console.log('get campaigns successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { MediaService };
