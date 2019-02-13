class RegistryService<T> {
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

  public register<K extends string, S>(key: K, service: S) {
    (this.registry as any)[key] = service;
    return this;
  }

  public get<K extends keyof T>(key: K): T[K] {
    if (!(key in this.registry)) {
      throw new Error(`No service found for ${key}`);
    }
    return this.registry[key];
  }
}

export { RegistryService };
