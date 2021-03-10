import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOuput } from 'src/common/dtos/output.dto';
import { Verification } from '../entities/verification.entity';

@ObjectType()
export class VerificationEmailOutput extends MutationOuput {}

@InputType()
export class VerificationEmailInput extends PickType(Verification, ['code']) {}
