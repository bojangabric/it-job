import { type EmploymentType } from '@prisma/client';

const values: Record<EmploymentType, string> = {
  INTERNSHIP: 'Internship',
  PART_TIME: 'Part-time',
  FULL_TIME: 'Full-time',
  CONTRACT: 'Contract'
};

export function transformTypeToValue(type: EmploymentType) {
  return values[type];
}
