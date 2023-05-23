import { type Experience } from '@prisma/client';

const values: Record<Experience, string> = {
  STUDENT: 'Student',
  JUNIOR: 'Junior',
  MID_LEVEL: 'Mid-level',
  SENIOR: 'Senior',
  LEAD: 'Lead'
};

export function transformExperienceToValue(experience: Experience) {
  return values[experience];
}
