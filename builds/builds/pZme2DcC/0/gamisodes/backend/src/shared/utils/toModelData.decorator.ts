import { Transform } from 'class-transformer';

export const ToModelData = (splitter: string = ' | ') =>
  Transform(({ value }: { value: string[] }) =>
    value.map((el) => {
      const [modelId, packagingModelId, chance] = el.split(splitter);
      return { modelId, packagingModelId, chance };
    }),
  );
