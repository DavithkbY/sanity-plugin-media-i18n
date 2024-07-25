import * as z from 'zod'

export const tagOptionSchema = z.object({
  label: z.string().trim().min(1, {message: 'Label cannot be empty'}),
  value: z.string().trim().min(1, {message: 'Value cannot be empty'})
})

export const assetFormSchema = z.object({
  altTexts: z.record(z.string()),
  titles: z.record(z.string()),
  creditLine: z.string().trim().optional(),
  descriptions: z.record(z.string()),
  opt: z.object({
    media: z.object({
      tags: z.array(tagOptionSchema).nullable()
    })
  }),
  originalFilename: z.string().trim().min(1, {message: 'Filename cannot be empty'})
})

export const tagFormSchema = z.object({
  name: z.string().min(1, {message: 'Name cannot be empty'})
})
