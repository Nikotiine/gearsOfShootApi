import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import jwtSecretKeyConfig from './jwtSecretKey.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtSecretKeyConfig().jwtSecretKey,
      signOptions: { expiresIn: '1d' },
    };
  },
};

export const validationJwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtSecretKeyConfig().jwtSecretKey,
      signOptions: { expiresIn: '3600s' },
    };
  },
};
