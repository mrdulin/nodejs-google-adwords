/**
 * The operator to use for filtering the data returned.
 * https://developers.google.com/adwords/api/docs/reference/v201809/AdGroupAdService.Predicate.Operator
 *
 * @enum {number}
 */

namespace Predicate {
  export enum Operator {
    EQUALS = 'EQUALS',
    NOT_EQUALS = 'NOT_EQUALS',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    GREATER_THAN = 'GREATER_THAN',
    GREATER_THAN_EQUALS = 'GREATER_THAN_EQUALS',
    LESS_THAN = 'LESS_THAN',
    LESS_THAN_EQUALS = 'LESS_THAN_EQUALS',
    STARTS_WITH = 'STARTS_WITH',
    STARTS_WITH_IGNORE_CASE = 'STARTS_WITH_IGNORE_CASE',
    CONTAINS = 'CONTAINS',
    CONTAINS_IGNORE_CASE = 'CONTAINS_IGNORE_CASE',
    DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
    DOES_NOT_CONTAIN_IGNORE_CASE = 'DOES_NOT_CONTAIN_IGNORE_CASE',
    CONTAINS_ANY = 'CONTAINS_ANY',
    CONTAINS_ALL = 'CONTAINS_ALL',
    CONTAINS_NONE = 'CONTAINS_NONE',
    UNKNOWN = 'UNKNOWN',
  }
}

enum SortOrder {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

interface IPaging {
  startIndex: number;
  numberResults: number;
}

interface IDateRange {
  min: string;
  max: string;
}

/**
 * Specifies how an entity (eg. adgroup, campaign, criterion, ad) should be filtered.
 *
 * @author dulin
 * @interface IPredicates
 */
interface IPredicate {
  field: string;
  operator: Predicate.Operator;
  values: string[];
}

interface IOrderBy {
  field: string;
  sortOrder: SortOrder;
}

interface ISelector {
  fields: string[];
  predicates?: IPredicate[];
  dateRange?: IDateRange;
  ordering?: IOrderBy[];
  paging?: IPaging;
}

export { ISelector, Predicate, IPaging };
