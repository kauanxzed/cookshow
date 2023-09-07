export abstract class SharedUtilServer {
  protected readonly salt = 10;
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hash: string): Promise<boolean>;
}
