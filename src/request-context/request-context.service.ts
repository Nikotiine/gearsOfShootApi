import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
interface ContextData {
  userId: number;
}
@Injectable()
export class RequestContextService {
  private static storage = new AsyncLocalStorage<ContextData>();

  static run(data: ContextData, callback: () => void) {
    this.storage.run(data, callback);
  }

  static getUserId(): number | undefined {
    return this.storage.getStore()?.userId;
  }
}
