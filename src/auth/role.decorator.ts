import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

type AllowedRoles = keyof typeof UserRole | 'ANY';

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
