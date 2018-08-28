import { IAudio, IImage, IMediaBundle, IVideo } from './Media';

export interface IMediaPage {
  entries: Array<IAudio | IImage | IMediaBundle | IVideo>;
  totalNumEntries: number;
}
