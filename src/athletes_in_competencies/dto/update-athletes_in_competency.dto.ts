import { PartialType } from '@nestjs/swagger';
import { CreateAthletesInCompetencyDto } from './create-athletes_in_competency.dto';

export class UpdateAthletesInCompetencyDto extends PartialType(CreateAthletesInCompetencyDto) {}
