import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private sock: any;
  private readonly logger = new Logger(WhatsappService.name);

  async onModuleInit() {
    await this.connectToWhatsApp();
  }

  async connectToWhatsApp() {
    // Cria uma pasta 'auth_info_baileys' na raiz para salvar a sessão e não pedir QR Code toda hora
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: true, //QR Code no terminal
      logger: pino({ level: 'silent' }) as any, // Silencia os logs do Baileys
    });

    this.sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        this.logger.log('Scan o QR Code acima com o seu WhatsApp!');
      }

      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        this.logger.warn('Conexão fechada. Reconectando...', shouldReconnect);
        
        if (shouldReconnect) {
          this.connectToWhatsApp();
        } else {
          this.logger.error('WhatsApp deslogado. Delete a pasta auth_info_baileys e gere um novo QR Code.');
        }
      } else if (connection === 'open') {
        this.logger.log('WhatsApp conectado com sucesso e pronto para uso!');
      }
    });

    // Salva as credenciais sempre que houver atualização
    this.sock.ev.on('creds.update', saveCreds);
  }

  // Método para notificar o cliente sobre o pedido
  async enviarMensagem(numero: string, texto: string) {
    if (!this.sock) return;
    
    // formato DDI+DDD+Numero@s.whatsapp.net
    const jid = `${numero}@s.whatsapp.net`;
    await this.sock.sendMessage(jid, { text: texto });
  }
}