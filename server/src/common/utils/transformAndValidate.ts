import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';

export const transformAndValidate = async <T, V>(cls: ClassType<T>, plain: V): Promise<T> => {
  const transformedObject = plainToClass(cls, plain, { enableImplicitConversion: true, excludeExtraneousValues: true });

  await validate(transformedObject, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  return transformedObject;
};
