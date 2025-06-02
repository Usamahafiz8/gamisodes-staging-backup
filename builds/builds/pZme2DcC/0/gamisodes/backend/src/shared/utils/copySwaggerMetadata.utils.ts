export const copySwaggerMetadata = (obj1: any, obj2: any) => {
  const properties: string[] = Reflect.getMetadata(
    'swagger/apiModelPropertiesArray',
    obj1.prototype,
  );

  Reflect.defineMetadata(
    'swagger/apiModelPropertiesArray',
    properties,
    Object.getPrototypeOf(obj2),
  );

  for (const property of properties) {
    const key = property.replace(':', '');
    const metaKeys: string[] = Reflect.getMetadataKeys(obj1.prototype, key);
    for (const metaKey of metaKeys) {
      const metadata = Reflect.getMetadata(metaKey, obj1.prototype, key);
      console.log(metaKey, key);

      Reflect.defineMetadata(
        metaKey,
        Object.assign(metadata),
        Object.getPrototypeOf(obj2),
        key,
      );
    }
  }
  return obj2;
};
