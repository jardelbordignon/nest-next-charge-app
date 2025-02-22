import { extendZodWithOpenApi, generateSchema } from '@anatine/zod-openapi'
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  UsePipes,
  applyDecorators,
} from '@nestjs/common'
import { ApiBadRequestResponse, ApiBody, ApiOperation } from '@nestjs/swagger'
import { ZodError, type ZodObject, type ZodSchema, type ZodType, z } from 'zod'
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

extendZodWithOpenApi(z)

type ZodObj<T> = ZodObject<{
  [key in keyof T]: ZodType<T[key]>
}>

class ValidationError extends BadRequestException {
  constructor(errors: ZodError['errors']) {
    const details = errors.map(({ path, ...rest }) => ({
      field: path.join('.'),
      ...rest,
    }))

    super({ details, error: 'InputData' })
  }

  static example(field = 'name') {
    const errors: ZodError['errors'] = [
      {
        code: 'invalid_type',
        expected: 'string',
        message: 'Required',
        path: [field],
        received: 'undefined',
      },
    ]
    return new this(errors).getResponse()
  }
}

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (!value) return

    const isNotBodyParam = metadata.type !== 'body'
    const isFile = typeof value === 'object' && 'fieldname' in value

    if (isNotBodyParam || isFile) return value

    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.errors)
      }

      throw new BadRequestException(`ZodValidationPipe failed: ${String(error)}`)
    }
  }
}

type Props = {
  badRequestDescription?: string
  bodyDescription?: string
  description?: string
  exampleErrorField?: string
  summary?: string
}

function transformSchema(schema: any) {
  const transformed = {
    type: schema.type[0],
    properties: {} as Record<string, { type: string; example: unknown }>,
    required: schema.required,
  }

  for (const [key, value] of Object.entries(schema.properties)) {
    if (
      typeof value === 'object' &&
      value !== null &&
      'type' in value &&
      Array.isArray(value.type)
    ) {
      transformed.properties[key] = {
        type: value.type[0],
        example: 'example' in value ? value.example : undefined,
      }
    }
  }

  return transformed
}

function ValidateAndDocumentBody(obj: ZodSchema, props: Props) {
  return applyDecorators(
    UsePipes(new ZodValidationPipe(obj)),
    ApiOperation({
      description: props?.description,
      summary: props?.summary,
    }),
    ApiBody({
      description: props?.bodyDescription,
      schema: transformSchema(generateSchema(obj)) as SchemaObject,
    }),
    ApiBadRequestResponse({
      description: props?.badRequestDescription ?? 'Invalid input data',
      schema: { example: ValidationError.example(props.exampleErrorField) },
    }),
  )
}

export { z, ZodObj, ValidateAndDocumentBody }
