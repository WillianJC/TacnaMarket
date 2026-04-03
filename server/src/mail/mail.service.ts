import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderConfirmation(email: string, cart: any[], total: number) {
    const itemsHtml = cart
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">S/ ${parseFloat(item.price).toFixed(2)}</td>
        </tr>`
      )
      .join('');

    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmación de Compra - Tacna Market 🛒',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
          <h2 style="color: #2c3e50; text-align: center;">¡Pedido Recibido!</h2>
          <p>Gracias por comprar con nosotros. Aquí tienes el resumen de tu pedido:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 10px; text-align: left;">Producto</th>
                <th style="padding: 10px; text-align: right;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="margin-top: 20px; text-align: right; font-size: 18px;">
            <strong>Total a pagar: S/ ${total.toFixed(2)}</strong>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
            Tacna Market - Productos frescos a tu puerta.
          </p>
        </div>
      `,
    });
  }
}