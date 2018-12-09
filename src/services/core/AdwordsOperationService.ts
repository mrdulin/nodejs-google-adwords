import { IOperation, Operator } from '../../types/adwords/Operator';

abstract class AdwordsOperartionService {
  protected get<ServiceSelector, Rval>(serviceSelector: ServiceSelector): Promise<Rval | undefined> {
    throw new Error('The method get does not overrided.');
  }

  protected getAsync<ServiceSelector, Rval>(serviceSelector: ServiceSelector): Promise<Rval | undefined> {
    throw new Error('The method getAsync does not overrided.');
  }

  protected mutate<Operation, Rval>(operations: Operation[]): Promise<Rval | undefined> {
    throw new Error('The method mutate does not overrided.');
  }

  protected mutateAsync<Operation, Rval>(operations: Operation[]): Promise<Rval | undefined> {
    throw new Error('The method mutateAsync does not overrided.');
  }

  protected mutateLabelAsync<Operation, Rval>(operations: Operation[]): Promise<Rval | undefined> {
    throw new Error('The method mutateLabelAsync does not overrided.');
  }

  protected upload<Media>(medias: Media[]) {
    throw new Error('The method upload does not overrided.');
  }
}

export { AdwordsOperartionService };
