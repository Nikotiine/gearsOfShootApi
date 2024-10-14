import { Module } from '@nestjs/common';
import { NodemailerController } from './nodemailer.controller';
import { NodemailerService } from './nodemailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [NodemailerController],
  providers: [NodemailerService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          secure: false,
          port: parseInt(process.env.MAIL_PORT) || 587,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
  exports: [NodemailerService],
})
export class NodemailerModule {}
