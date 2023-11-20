import { Injectable } from '@nestjs/common';

@Injectable()
export class NameService {
  getName(name: string): string {
    return `Hello, ${name}`;
  }
}
