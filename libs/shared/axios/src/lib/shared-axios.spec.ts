import { sharedAxios } from './shared-axios';

describe('sharedAxios', () => {
    it('should work', () => {
        expect(sharedAxios()).toEqual('shared-axios');
    })
})