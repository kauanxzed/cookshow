import { SharedUtilService } from './shared-util.service';
import * as bcrypt from 'bcrypt';

export class SharedUtilServiceImpl extends SharedUtilService {
  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash;
  }
  async compare(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}
