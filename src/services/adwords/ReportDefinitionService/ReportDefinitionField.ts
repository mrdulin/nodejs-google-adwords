export interface IReportDefinitionField {
  readonly fieldName: string;
  readonly displayFieldName: string;
  readonly xmlAttributeName: string;
  readonly fieldType: string;
  readonly fieldBehavior: string;
  readonly enumValues: string;
  readonly canSelect: string;
  readonly canFilter: string;
  readonly isEnumType: string;
  readonly isBeta: string;
  readonly isZeroRowCompatible: string;
  readonly enumValuePairs: any[];
  readonly exclusiveFields: string[];
}
