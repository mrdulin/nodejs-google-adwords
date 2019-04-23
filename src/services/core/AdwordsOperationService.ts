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
}

export { AdwordsOperartionService };
