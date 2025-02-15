import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse, CurrentUser } from '~/common/decorators';
import { AuthGuard } from '~/common/guards';
import { JwtPayload } from '~/common/models';
import { User } from '~/entities';
import { ChangePasswordDto } from './me.dto';
import { MeService } from './me.service';

@ApiTags('me')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  @ApiResponse({ model: User })
  whoAmI(@CurrentUser() currentUser: JwtPayload) {
    return this.meService.whoAmI(currentUser);
  }

  @Post('change-password')
  @ApiResponse({ example: true })
  changePassword(
    @CurrentUser() currentUser: JwtPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.meService.changePassword(currentUser, dto);
  }
}
