import { removeMetaDataFromBase64 } from './utils';

it('should remove base64 data', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANS...';
    const result = removeMetaDataFromBase64(base64);

    expect(result).toEqual('iVBORw0KGgoAAAANS...');
});
