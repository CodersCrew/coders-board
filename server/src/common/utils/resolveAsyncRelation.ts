type Unpromisify<T> = T extends Promise<infer R> ? R : T;

export function resolveAsyncRelation<T extends { id: string }, K extends keyof T>(
  relationKey: K,
  findFc: (id: string) => Promise<T>,
) {
  return async function (entity: T): Promise<Unpromisify<T[K]>> {
    let relation: any = await entity[relationKey];
    console.log(222, relation);

    if (!relation && entity[`${relationKey}Id`]) {
      const record = await findFc.bind(this)(entity.id);
      relation = await record[relationKey];
    }

    return relation;
  };
}
