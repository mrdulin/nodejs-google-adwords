import { pd } from 'pretty-data';

import { SoapService, AdwordsOperartionService } from '../../core';
import { ISelector, Predicate } from '../../../types/adwords';
import { ILocationCriterion } from './LocationCriterion';

interface ILocationCriterionServiceOpts {
  soapService: SoapService;
}

class LocationCriterionService extends AdwordsOperartionService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-LocationCriterionService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof LocationCriterionService
   */
  private static readonly selectorFields: string[] = ['CanonicalName', 'Reach'];

  private soapService: SoapService;
  constructor(options: ILocationCriterionServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  /**
   * find location criterion by criterion ids
   *
   * @author dulin
   * @param {string[]} criterionIds
   * @returns
   * @memberof LocationCriterionService
   */
  public getByIds(criterionIds: string[]) {
    const serviceSelector: ISelector = {
      fields: LocationCriterionService.selectorFields,
      predicates: [
        {
          field: 'Id',
          operator: Predicate.Operator.IN,
          values: criterionIds
        }
      ]
    };
    return this.get(serviceSelector);
  }

  /**
   * find location criterion by location name
   *
   * @author dulin
   * @param {string[]} criterionNames
   * @returns
   * @memberof LocationCriterionService
   */
  public getByNames(criterionNames: string[]) {
    const serviceSelector: ISelector = {
      fields: LocationCriterionService.selectorFields,
      predicates: [
        {
          field: 'LocationName',
          operator: Predicate.Operator.IN,
          values: criterionNames
        }
      ]
    };
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Rval = ILocationCriterion>(
    serviceSelector: ServiceSelector
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      console.log('get campaign criterion successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { LocationCriterionService };
