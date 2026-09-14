import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { ResponseCategoryDto } from '../../categories/dto/response-category.dto';
import { ResponseCompetencyDto } from '../../competencies/dto/response-competency.dto';
import { ResponseAthInCat } from '../../athletes_in_categories/dto/response-ath_cat.dto';
import { ResponseAthInComp } from '../../athletes_in_competencies/dto/response-athletes_in_competency.dto';
import { PaginationDto } from './pagination.dto';
import { ResponseMatchDto } from '../../matches/dto/response-match.dto';

export class MessageResponseDto { @ApiProperty({ example: 'Success' }) status: string; @ApiProperty({ example: 'Operación realizada con éxito.' }) mensaje: string; }
export class UserResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseUserDto }) user: ResponseUserDto; }
export class UsersPaginatedResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseUserDto, isArray: true }) users: ResponseUserDto[]; @ApiProperty({ type: PaginationDto }) pagination: PaginationDto; }
export class CategoryResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseCategoryDto }) category: ResponseCategoryDto; }
export class CategoriesPaginatedResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseCategoryDto, isArray: true }) category: ResponseCategoryDto[]; @ApiProperty({ type: PaginationDto }) pagination: PaginationDto; }
export class CompetencyResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseCompetencyDto }) competency: ResponseCompetencyDto; }
export class CompetenciesPaginatedResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseCompetencyDto, isArray: true }) competency: ResponseCompetencyDto[]; @ApiProperty({ type: PaginationDto }) pagination: PaginationDto; }
export class CompetencyMutationResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseCompetencyDto, description: 'La implementación actual devuelve esta propiedad con el nombre `category`.' }) category: ResponseCompetencyDto; }
export class AthleteInCategoryResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseAthInCat }) athInCat: ResponseAthInCat; }
export class AthletesInCategoriesPaginatedResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseAthInCat, isArray: true }) athInCat: ResponseAthInCat[]; @ApiProperty({ type: PaginationDto }) pagination: PaginationDto; }
export class AthleteInCompetencyResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseAthInComp }) athInComp: ResponseAthInComp; }
export class AthleteInCompetencyUpdateResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseAthInComp, description: 'La implementación actual devuelve esta propiedad con el nombre `athInCat`.' }) athInCat: ResponseAthInComp; }
export class AthletesInCompetenciesPaginatedResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseAthInComp, isArray: true, description: 'La implementación actual devuelve esta propiedad con el nombre `athInCat`.' }) athInCat: ResponseAthInComp[]; @ApiProperty({ type: PaginationDto }) pagination: PaginationDto; }
export class MatchResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseMatchDto }) match: ResponseMatchDto; }
export class MatchesPaginatedResponseDto extends MessageResponseDto { @ApiProperty({ type: ResponseMatchDto, isArray: true }) matches: ResponseMatchDto[]; @ApiProperty({ type: PaginationDto }) pagination: PaginationDto; }
