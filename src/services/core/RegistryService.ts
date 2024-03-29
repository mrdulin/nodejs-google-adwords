/**
 * TODO: improve the static types
 *
 * @author dulin
 * @class RegistryService
 * @template T
 */
class RegistryService<T extends object> {
  public static instance;
  public static init() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new RegistryService({});
    return this.instance;
  }
  private registry: T;
  private constructor(registry: T) {
    this.registry = registry;
  }

  public register<S extends new () => S>(service: S) {
    this.registry[service.name] = service;
    return this;
  }

  public get<K extends keyof T>(key: K): T[K] {
    if (!(key in this.registry)) {
      throw new Error(`No service found for ${String(key)}`);
    }
    return this.registry[key];
  }
}

export { RegistryService };
