import { Media } from './enum/Media';
import { IMedia_Size_DimensionsMapEntry } from './Media_Size_DimensionsMapEntry';
import { IMedia_Size_StringMapEntry } from './Media_Size_StringMapEntry';
import { IAttributes } from '../../../types/adwords/Attributes';

interface IMediaRaw<Type> extends IAttributes<Type> {
  mediaId: string;
  type: Media.MediaType;
  referenceId: string;
  dimensions: IMedia_Size_DimensionsMapEntry[];
  readonly urls: IMedia_Size_StringMapEntry[];
  mimeType: Media.LegacyMimeType;
  sourceUrl: string;
  name: string;
  fileSize: string;
  creationTime: string;
  'Media.Type': string;
}

interface IMedia<Type> extends Partial<IMediaRaw<Type>> {}

interface IImage extends IMedia<'Image'> {
  data: string;
}

interface IAudio extends IMedia<'Audio'> {
  durationMillis: number;
  streamingUrl: string;
  readyToPlayOnTheWeb: boolean;
}

interface IVideo extends IMedia<'Video'> {
  durationMillis: number;
  streamingUrl: string;
  readyToPlayOnTheWeb: boolean;
  industryStandardCommercialIdentifier: string;
  advertisingId: string;
  youTubeVideoIdString: string;
}

interface IMediaBundle extends IMedia<'MediaBundle'> {
  data: string;
  mediaBundleUrl: string;
  entryPoint: string;
}

export { IImage, IAudio, IVideo, IMediaBundle };
