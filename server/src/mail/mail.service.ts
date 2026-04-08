import { Injectable, Logger, Inject } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(@Inject('RESEND_CLIENT') private readonly resend: Resend) {}

  async sendOrderConfirmation(email: string, cart: any[], total: number) {
    try {
      const itemsHtml = cart
        .map((item) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
              S/ ${parseFloat(item.price).toFixed(2)}
            </td>
          </tr>`)
        .join('');

      const urlTuQR = 'https://tacna-market-bucket.s3.us-east-2.amazonaws.com/branding/yape-HD.png';

      const response = await this.resend.emails.send({
        from: 'Tacna Market <ventas@tacna-market.shop>',
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

            <div style="margin-top: 30px; padding: 20px; background-color: #fdf2f2; border-radius: 8px; text-align: center; border: 2px solid #8c2a8d;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #8c2a8d; font-size: 16px;">Paga ahora con Yape o Plin</p>
              <img src="${urlTuQR}" alt="QR de Pago" style="width: 220px; height: 220px; border: 4px solid #fff; border-radius: 5px;" />
              <p style="margin: 15px 0 0 0; font-size: 13px; color: #444;">Escanea y envía la captura a nuestro WhatsApp.</p>
            </div>
          </div>
        `,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      this.logger.log(`Correo de confirmación enviado a: ${email} (ID: ${response.data?.id})`);

    } catch (error) {
      this.logger.error(`Error al enviar correo a ${email}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}