import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Controller('orders') // La URL será: http://localhost:3000/orders
export class OrdersController {
  constructor(private readonly mailService: MailService) {}

  @Post('checkout') // La URL final: POST /orders/checkout
  async handleCheckout(@Body() body: { email: string; cart: any[]; total: number }) {
    const { email, cart, total } = body;

    console.log(`Procesando pedido para: ${email}`);

    try {
      // Aquí es donde ocurre la magia: llamamos a tu servicio de correo
      await this.mailService.sendOrderConfirmation(email, cart, total);
      
      return {
        success: true,
        message: 'Pedido procesado y correo enviado con éxito',
      };
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return {
        success: false,
        message: 'El pedido se registró, pero hubo un error al enviar el correo.',
      };
    }
  }
}