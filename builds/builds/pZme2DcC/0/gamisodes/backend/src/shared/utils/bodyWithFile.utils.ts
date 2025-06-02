import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';

interface ApiBodyWithFileOptions {
  entity: Function;
  fileField?: string;
  description?: string;
}

export const ApiBodyWithFile = ({
  entity,
  fileField = 'media',
  description = 'Description',
}: ApiBodyWithFileOptions) => {
  return applyDecorators(
    ApiExtraModels(entity),
    ApiConsumes('multipart/form-data'),
    fileField &&
      description &&
      ApiBody({
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(entity) },
            {
              properties: { [fileField]: { type: 'string', format: 'binary' } },
            },
          ],
        },
      }),
  );
};
