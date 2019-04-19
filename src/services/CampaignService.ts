import { AdWordsService, IAdWordsServiceOpts } from './AdWordsService';
import { Omit } from '../models/core';
import { pd } from 'pretty-data';

interface ICampaignServiceOpts extends Omit<IAdWordsServiceOpts, 'serviceName'> {}

enum PredicateOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  IN = 'IN'
}

enum SortOrder {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING'
}

interface IPaging {
  startIndex: number;
  numberResults: number;
}

interface IDateRange {
  min: string;
  max: string;
}

interface IPredicates {
  field: string;
  operator: PredicateOperator;
  values: string[];
}

interface IOrderBy {
  field: string;
  sortOrder: SortOrder;
}

interface ICampaignServiceSelector {
  fields: string[];
  predicates?: IPredicates[];
  dateRange?: IDateRange;
  ordering?: IOrderBy[];
  paging?: IPaging;
}

/**
 * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-CampaignService
 *
 * @author dulin
 * @class CampaignService
 * @extends {AdWordsService}
 */
class CampaignService extends AdWordsService {
  constructor(options: ICampaignServiceOpts) {
    const defaultOptions = {
      serviceName: 'CampaignService'
    };
    super(Object.assign({}, defaultOptions, options));
    this.setVerbose(true);
  }

  public async getCampaigns(selector: ICampaignServiceSelector) {
    return this.get<ICampaignServiceSelector>(selector).then(response => {
      console.log('get campaigns successfully. response: ', pd.json(response));
      return response;
    });
  }

  // public parseGetResponse(response) {}
}

export { CampaignService, ICampaignServiceSelector, ICampaignServiceOpts };
