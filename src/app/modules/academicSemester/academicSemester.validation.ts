import { z } from 'zod';

const createSemesterValidation = z.object({
  year: z.number({
    required_error: 'Year is required',
  }),
  title: z.string({
    required_error: 'title is required',
  }),
  code: z.string({
    required_error: 'title is required',
  }),
  startMonth: z.string({
    required_error: 'Start Month is required',
  }),
  endMonth: z.string({
    required_error: 'End Month is required',
  }),
});

export const SemesterValidation = {
  createSemesterValidation,
};
