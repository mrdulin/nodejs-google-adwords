import fs from 'fs';
import path from 'path';

import { adwordsService } from '../../../initialize';
import { IImage } from '../../../../services/adwords/MediaService/Media';
import { Media } from '../../../../services/adwords/MediaService/enum/Media';

describe.skip('MediaService test suites', () => {
  const mediaService = adwordsService.getService('MediaService', { verbose: false });
  it('#getAll', async () => {
    const actualValue = await mediaService.getAll();
  });

  it.skip('#upload', async () => {
    const file: Buffer = fs.readFileSync(path.resolve(__dirname, './medias/tes_dogbone.jpg'));
    const image: IImage = {
      // order is important
      type: Media.MediaType.IMAGE,
      data: mediaService.base64Encode(file),
      attributes: {
        'xsi:type': 'Image',
      },
    };

    const medias = [image];
    const actualValue = await mediaService.upload(medias);
  });
});
