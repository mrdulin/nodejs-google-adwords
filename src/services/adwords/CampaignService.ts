import { pd } from 'pretty-data';
import { SoapService } from '../core';

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

interface ICampaignService {
  soapService: SoapService;
}

/**
 * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-CampaignService
 *
 * @author dulin
 * @class CampaignService
 * @extends {AdWordsService}
 */
class CampaignService {
  private soapService: SoapService;
  constructor(options: ICampaignService) {
    const defaultOptions = {
      validateOnly: false,
      partialFailure: false
    };
    this.soapService = options.soapService;
  }

  public async getCampaigns(selector: ICampaignServiceSelector) {
    return this.soapService.get<ICampaignServiceSelector>(selector).then(response => {
      console.log('get campaigns successfully. response: ', pd.json(response));
      return response;
    });
  }

  // public parseGetResponse(response) {}
}

export { CampaignService, ICampaignServiceSelector };
