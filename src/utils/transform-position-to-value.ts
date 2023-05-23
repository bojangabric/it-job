import { type Position } from '@prisma/client';

const values: Record<Position, string> = {
  UI_UX_DESIGNER: 'UI/UX Designer',
  SYSTEM_ADMINISTRATOR: 'System Administrator',
  FULL_STACK_DEVELOPER: 'Full-Stack Developer',
  FRONT_END_DEVELOPER: 'Front-End Developer',
  BACK_END_DEVELOPER: 'Back-End Developer'
};

export function transformPositionToValue(position: Position) {
  return values[position];
}
