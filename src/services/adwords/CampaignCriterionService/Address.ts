import { StringOrNull } from '../../../types/core';

interface IAddress {
  streetAddress: StringOrNull;
  streetAddress2: StringOrNull;
  cityName: StringOrNull;
  provinceCode: StringOrNull;
  provinceName: StringOrNull;
  postalCode: StringOrNull;
  countryCode: StringOrNull;
}

export { IAddress };
