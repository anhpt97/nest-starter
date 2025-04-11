import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  check(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
  }
}
