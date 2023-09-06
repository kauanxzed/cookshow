import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class SharedUtilService {
  protected readonly salt = 10;
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hash: string): Promise<boolean>;
}
