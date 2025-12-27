import {z} from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido"
    }),
    description: z.string({
        required_error: "Description must be a string"
    }),
    date: z.string().datetime().optional(),
})