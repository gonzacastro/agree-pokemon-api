import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterCardDto, InsertCardDto, UpdateCardDto } from 'src/dto/card.dto';
import { PageMetaDto } from 'src/dto/page-meta.dto';
import { PageOptionsDto } from 'src/dto/page-options.dto';
import { PageDto } from 'src/dto/page.dto';
import { SuccessResponseDto } from 'src/dto/Response.dto';
import { CardEntity } from 'src/entities/card.entity';
import { CardModel } from 'src/models/Card.Model';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) {}

  async getAllCardsPaginated(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CardModel>> {
    let obj;
    let itemCount;
    try {
      const queryBuilder = this.cardsRepository.createQueryBuilder('card');
      queryBuilder
        .orderBy('card.created_date', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);
      itemCount = await queryBuilder.getCount();
      obj = await queryBuilder.getRawAndEntities();
    } catch (err) {
      throw new HttpException('Fetch error!', 500);
    }
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    const response: CardModel[] = [];
    for (let i = 0; i < obj.entities.length; i++) {
      response.push(
        new CardModel(
          obj.entities[i].id,
          obj.entities[i].name,
          obj.entities[i].hp,
          obj.entities[i].first_edition,
          (await obj.entities[i].expansion_pack).name,
          (await obj.entities[i].type).name,
          (await obj.entities[i].rarity).name,
          obj.entities[i].price,
          obj.entities[i].image,
          obj.entities[i].created_date,
        ),
      );
    }
    return new PageDto(response, pageMetaDto);
  }

  async getAllCards(): Promise<SuccessResponseDto> {
    let responseCards: CardEntity[] = [];
    try {
      responseCards = await this.cardsRepository.find();
    } catch (err) {
      throw new HttpException('Fetch error!', 500);
    }
    const response: CardModel[] = [];
    for (let i = 0; i < responseCards.length; i++) {
      response.push(
        new CardModel(
          responseCards[i].id,
          responseCards[i].name,
          responseCards[i].hp,
          responseCards[i].first_edition,
          (await responseCards[i].expansion_pack).name,
          (await responseCards[i].type).name,
          (await responseCards[i].rarity).name,
          responseCards[i].price,
          responseCards[i].image,
          responseCards[i].created_date,
        ),
      );
    }
    return new SuccessResponseDto(200, 'Success', response);
  }

  async getAllWithFilters(
    queryString: FilterCardDto,
  ): Promise<SuccessResponseDto> {
    const filters = {};
    for (const i in queryString) {
      filters[i] = queryString[i];
    }
    let query =
      'SELECT card.id FROM card INNER JOIN rarity ON rarity.id = card.id_rarity INNER JOIN type ON type.id = card.id_type INNER JOIN expansion_pack ON expansion_pack.id = card.id_expansion_pack WHERE ';
    for (const i in filters) {
      query += `card.${i} LIKE '%${filters[i]}%' AND `;
    }
    const entityManager = getManager();
    let res: string | any[];
    try {
      const rawData = await entityManager.query(
        query.substring(0, query.length - 5),
      );
      const array = [];
      for (const i in rawData) {
        array.push(rawData[i].id);
      }
      res = await this.cardsRepository.findByIds(array);
    } catch (err) {
      throw new HttpException('Fetch error!', 500);
    }
    const response: CardModel[] = [];
    for (let i = 0; i < res.length; i++) {
      response.push(
        new CardModel(
          res[i].id,
          res[i].name,
          res[i].hp,
          res[i].first_edition,
          (await res[i].expansion_pack).name,
          (await res[i].type).name,
          (await res[i].rarity).name,
          res[i].price,
          res[i].image,
          res[i].created_date,
        ),
      );
    }
    return new SuccessResponseDto(200, 'Success', response);
  }

  async getCardById(id: number): Promise<SuccessResponseDto> {
    let responseCard: CardEntity;
    try {
      responseCard = await this.cardsRepository.findOne(id);
    } catch (err) {
      throw new HttpException('Fetch error!', 500);
    }
    if (!responseCard) {
      throw new HttpException(
        `So sorry, but couldn't find a Pokemon with id ${id}!`,
        404,
      );
    } else {
      const response = new CardModel(
        responseCard.id,
        responseCard.name,
        responseCard.hp,
        responseCard.first_edition,
        (await responseCard.expansion_pack).name,
        (await responseCard.type).name,
        (await responseCard.rarity).name,
        responseCard.price,
        responseCard.image,
        responseCard.created_date,
      );
      return new SuccessResponseDto(200, 'Success', response);
    }
  }

  async insertCard(payload: InsertCardDto): Promise<SuccessResponseDto> {
    await getManager().transaction(async (transactionalEntityManager) => {
      try {
        await transactionalEntityManager.insert(CardEntity, payload);
      } catch (err) {
        if (
          err['sqlMessage'] == "Duplicate entry 'Pikachu' for key 'card.name'"
        ) {
          throw new HttpException('Attempted to insert duplicate!', 409);
        }
        throw new HttpException('Insertion failed!', 500);
      }
    });
    return new SuccessResponseDto(201, 'Success');
  }

  async updateCard(
    id: number,
    payload: UpdateCardDto,
  ): Promise<SuccessResponseDto> {
    let res;
    try {
      res = await this.cardsRepository.update({ id: id }, payload);
    } catch (err) {
      throw new HttpException('Update failed!', 500);
    }
    if (res.affected) {
      return new SuccessResponseDto(200, 'Successfull update!');
    } else {
      throw new HttpException('No record found!', 404);
    }
  }

  async deleteCard(id: number): Promise<SuccessResponseDto> {
    let res;
    try {
      res = await this.cardsRepository.delete(id);
    } catch (err) {
      throw new HttpException('Deletion failed!', 500);
    }
    if (res.affected) {
      return new SuccessResponseDto(200, 'Successfull deletion!');
    } else {
      throw new HttpException('No record found!', 404);
    }
  }
}
