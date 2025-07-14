// src/common/scalars/upload.scalar.ts
import { Scalar } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';   // or 'graphql-upload'
import { ValueNode } from 'graphql';

@Scalar('Upload', type => GraphQLUpload)
export class UploadScalar {
  description = 'The `Upload` scalar type represents a file upload.';

  parseValue(value) {
    return value;
  }
  serialize(value) {
    return value;
  }
  parseLiteral(ast: ValueNode) {
    // GraphQL spec requires Upload to come in as a variable, not inline
    throw new Error('Upload literal unsupported, use variables');
  }
}
