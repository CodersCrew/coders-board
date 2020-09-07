import { applyDecorators } from '@nestjs/common';
import { IsEmail, IsLowercase, Matches } from 'class-validator';

export const IsOrganizationEmail = () => applyDecorators(IsEmail(), IsLowercase(), Matches(/.*@coderscrew\.pl$/));
