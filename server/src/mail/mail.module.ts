import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'RESEND_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const apiKey = config.get<string>('RESEND_API_KEY');
        return new Resend(apiKey);
      },
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}