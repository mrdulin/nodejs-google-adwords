import { IAccountLabel } from './AccountLabel';

interface IManagedCustomerRaw {
  name: string;
  readonly customerId: string;
  canManageClients: boolean;
  currencyCode: string;
  dateTimeZone: string;
  testAccount: boolean;
  readonly accountLabels: IAccountLabel[];
  readonly excludeHiddenAccounts: boolean;
}

interface IManagedCustomer extends Partial<IManagedCustomerRaw> {}

export { IManagedCustomer };
