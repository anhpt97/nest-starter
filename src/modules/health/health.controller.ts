import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { APP_NAME, HEALTH_CHECK_URL } from '~/common/constants';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private typeormHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.httpHealthIndicator.pingCheck(APP_NAME, HEALTH_CHECK_URL),
      () => this.typeormHealthIndicator.pingCheck('database'),
      // () =>
      //   this.typeormHealthIndicator.pingCheck('database', {
      //     connection: void new DataSource({
      //       type: 'mysql',
      //       host: DB_HOST,
      //       port: DB_PORT,
      //       username: DB_USER,
      //       password: DB_PASSWORD,
      //       database: DB_NAME,
      //     }).initialize(),
      //   }),
    ]);
  }
}
