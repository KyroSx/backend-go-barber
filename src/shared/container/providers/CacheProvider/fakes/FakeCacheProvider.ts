import ICacheProvider from '../models/ICacheProvider';

interface ICacheMap {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private client: ICacheMap = {};

  public async save(key: string, value: any): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const cachedData = this.client[key];

    if (!cachedData) {
      return null;
    }

    const parsedCachedData = JSON.parse(cachedData) as T;

    return parsedCachedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key => key.startsWith(prefix));

    keys.forEach(key => delete this.client[key]);
  }
}

export default FakeCacheProvider;
