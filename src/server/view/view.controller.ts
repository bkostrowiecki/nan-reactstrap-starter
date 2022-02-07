import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(
    private viewService: ViewService,
    private configService: ConfigService,
  ) {}

  @Get('*')
  getStatic(@Req() req: Request, @Res() res: Response) {
    const auth = {
      login: this.configService.get('BASIC_AUTH_LOGIN'),
      password: this.configService.get('BASIC_AUTH_PASSWORD'),
    };

    if (auth.login && auth.password) {
      this.handleCredentials(req, res, auth);

      return;
    }

    this.runNextHandler(req, res);
  }

  handleCredentials(
    req: Request,
    res: Response,
    auth: { login: string; password: string },
  ) {
    res.set('WWW-Authenticate', 'Basic realm="401"');

    const { login, password } = this.getCredentialsFromHeader(req);

    if (
      login &&
      password &&
      login === auth.login &&
      password === auth.password
    ) {
      this.runNextHandler(req, res);

      return;
    }

    res
      .status(401)
      .send(
        this.configService.get('BASIC_AUTH_MESSAGE') ||
          'Authentication required.',
      );
  }

  getCredentialsFromHeader(req: Request) {
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');

    return {
      login,
      password,
    };
  }

  runNextHandler(req: Request, res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    handle(req, res as any);
  }
}
