import { StringOrNull } from '../../../types/core';

interface IAddressRaw {
  streetAddress: StringOrNull;
  streetAddress2: StringOrNull;
  cityName: StringOrNull;
  provinceCode: StringOrNull;
  provinceName: StringOrNull;
  postalCode: StringOrNull;
  countryCode: StringOrNull;
}

interface IAddress extends Partial<IAddressRaw> {}

export { IAddress };
