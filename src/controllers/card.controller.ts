import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterCardDto, InsertCardDto, UpdateCardDto } from 'src/dto/card.dto';
import { PageOptionsDto } from 'src/dto/page-options.dto';
import { PageDto } from 'src/dto/page.dto';
import { SuccessResponseDto } from 'src/dto/Response.dto';
import { CardModel } from 'src/models/Card.Model';
import { CardService } from 'src/services/card.service';

@ApiTags('Poke-cards CRUD')
@Controller('cards')
export class CardController {
  constructor(private cardsService: CardService) {}

  @Get()
  @ApiOperation({ summary: 'Lists all cards from the database' })
  @ApiResponse({ status: 500, description: 'Fetch error' })
  async getAllCards(): Promise<SuccessResponseDto> {
    return await this.cardsService.getAllCards();
  }

  @Get('paginated')
  @ApiOperation({
    summary: 'Lists all cards paginated by the given parameters',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 500, description: 'Fetch error' })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'OK', type: PageDto })
  async getAllCardsPaginated(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CardModel>> {
    return await this.cardsService.getAllCardsPaginated(pageOptionsDto);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Lists all cards given a series of conditions' })
  @ApiResponse({ status: 500, description: 'Fetch error' })
  async getAllWithFilters(
    @Query() queryString: FilterCardDto,
  ): Promise<SuccessResponseDto> {
    return await this.cardsService.getAllWithFilters(queryString);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'Number',
    example: '1',
    required: false,
    description: 'Given an ID it fetches all card details',
  })
  @ApiResponse({ status: 500, description: 'Fetch error' })
  @ApiOperation({ summary: 'Lists all the card fields given an ID' })
  async getCardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto> {
    return await this.cardsService.getCardById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Inserts a card' })
  @ApiResponse({ status: 500, description: 'Insertion failed' })
  @ApiResponse({ status: 409, description: 'Attempted to insert duplicate' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'Successfull insertion' })
  async insertCard(
    @Body() payload: InsertCardDto,
  ): Promise<SuccessResponseDto> {
    return await this.cardsService.insertCard(payload);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    type: 'Number',
    example: '1',
    required: false,
    description:
      'Given an ID it updates the fields given in the body (only the specified)',
  })
  @ApiOperation({ summary: 'Updates a card given its ID' })
  @ApiResponse({ status: 500, description: 'Update failed' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 200, description: 'Successfull update' })
  @ApiResponse({ status: 204, description: 'No records updated' })
  async updateCard(
    @Body() payload: UpdateCardDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto> {
    return await this.cardsService.updateCard(id, payload);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: 'Number',
    example: '1',
    required: false,
    description: 'Deletes the ID given in param',
  })
  @ApiOperation({ summary: 'Deletes a card given its ID' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Deletion failed' })
  @ApiResponse({ status: 200, description: 'Successful Deletion' })
  @ApiResponse({ status: 204, description: 'No records deleted' })
  async deleteCard(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto> {
    return await this.cardsService.deleteCard(id);
  }
}
