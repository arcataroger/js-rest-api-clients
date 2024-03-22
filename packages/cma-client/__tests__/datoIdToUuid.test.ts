import { validate } from 'uuid';
import { datoIdToUuid } from '../src/datoIdToUuid';
import { generateId } from '../src/generateId';

describe('datoIdToUuid', () => {
  it('converts an example URL-safe Base64 DatoID to a valid UUID hex string', () => {
    const base64url = 'WTyssHtyTzu9_EbszSVhPw';
    const expectedUuid = '593cacb0-7b72-4f3b-bdfc-46eccd25613f';

    const result = datoIdToUuid(base64url);

    expect(result).toBe(expectedUuid);
    expect(validate(result)).toBe(true);
  });

  it('expects an ID from generateId() to validate as a v4 UUID', () => {
    const base64Id = generateId();
    const uuid = datoIdToUuid(base64Id);
    expect(validate(uuid)).toBe(true);
  });
});
