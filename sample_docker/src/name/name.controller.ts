import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { NameService } from './name.service';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}
  @Get('/:yourName')
  getName(@Param('yourName') name: string) {
    if (!name) {
      throw new NotFoundException(`Can't find your name`);
    }
    return this.nameService.getName(name);
  }
}
