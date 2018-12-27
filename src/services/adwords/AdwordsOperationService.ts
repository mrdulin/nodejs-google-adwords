abstract class AdwordsOperartionService {
  protected get<ServiceSelector, Response>(serviceSelector: ServiceSelector): Promise<Response> {
    throw new Error('Need implementate get method.');
  }

  protected getAsync<ServiceSelector, Response>(serviceSelector: ServiceSelector): Promise<Response> {
    throw new Error('Need implementate getAsync method.');
  }

  protected mutate<Operation, Response>(operations: Operation[]): Promise<Response> {
    throw new Error('Need implementate mutate method.');
  }

  protected mutateAsync<Operation, Response>(operations: Operation[]): Promise<Response> {
    throw new Error('Need implementate mutateAsync method.');
  }
}

export { AdwordsOperartionService };
