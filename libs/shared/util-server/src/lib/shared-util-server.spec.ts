import { sharedUtilServer } from './shared-util-server';

describe('sharedUtilServer', () => {
  it('should work', () => {
    expect(sharedUtilServer()).toEqual('shared-util-server');
  });
});
