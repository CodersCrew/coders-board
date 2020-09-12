import { times } from 'lodash';

import { Success, SuccessType } from './success.model';
import { SuccessRepository } from './success.repository';
import { SuccessesResolver } from './successes.resolver';
import { SuccessesService } from './successes.service';

const createSuccessMock = (id: number) => {
  const success = new Success();

  success.id = `id-${id}`;
  success.name = 'Some success';
  success.description = 'Success description';
  success.date = new Date();

  return success;
};

describe('SuccessesResolver', () => {
  let successesResolver: SuccessesResolver;
  let successesService: SuccessesService;

  beforeEach(() => {
    successesService = new SuccessesService({} as SuccessRepository);
    successesResolver = new SuccessesResolver(successesService);
  });

  describe('getSuccesses', () => {
    it('should call the successes service', async () => {
      const result = times(3, createSuccessMock);
      jest.spyOn(successesService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await successesResolver.getSuccesses()).toBe(result);
    });

    it('should pass all args to the service', async () => {
      const result = times(3, createSuccessMock);
      const args = { search: 'text', type: SuccessType.EPIC };
      const fn = jest.spyOn(successesService, 'findAll').mockImplementation(() => Promise.resolve(result));

      const successes = await successesResolver.getSuccesses({ search: 'text', type: SuccessType.EPIC });

      expect(successes).toBe(result);
      expect(fn).toBeCalledWith(args);
    });
  });
});
