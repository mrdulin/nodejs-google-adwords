import { IPage } from './abstract/Page';
import { IManagedCustomer } from './ManagedCustomer';
import { IManagedCustomerLink } from './ManagedCustomerLink';

export interface IManagedCustomerPage extends IPage {
  entries: IManagedCustomer[];
  links: IManagedCustomerLink[];
}
