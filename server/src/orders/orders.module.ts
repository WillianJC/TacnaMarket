import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MailModule } from '../mail/mail.module'; // Importamos el módulo que creamos antes

@Module({
  imports: [MailModule], // <--- IMPORTANTE: Esto permite usar MailService aquí
  controllers: [OrdersController],
})
export class OrdersModule {}