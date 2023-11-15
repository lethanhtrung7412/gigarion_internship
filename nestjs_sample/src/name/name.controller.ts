import { Controller, Get, Res, Param, Post, Body } from '@nestjs/common';
import { NameService } from './name.service';
import { Response } from 'express';
import { CreateNameDto } from './create-name.dto';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Get(':name')
  getName(@Param('name') name: any, @Res() res: Response) {
    return res.status(200).send(this.nameService.getName(name));
  }

  @Post()
  async createName(@Body() createNameDto: CreateNameDto) {
    return `This action adds a new name. Name ${createNameDto.name}, Age ${createNameDto.age}`;
  }
}
