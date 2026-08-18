import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  
  @Post('produto')
  @UseInterceptors(FileInterceptor('imagem', {
    storage: diskStorage({
      destination: './uploads/produtos', 
      filename: (req, file, callback) => {
        // Gera um nome único para não sobrescrever imagens com o mesmo nome
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extensao = extname(file.originalname);
        callback(null, `produto-${uniqueSuffix}${extensao}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      // Bloqueia arquivos que não sejam imagens
      if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        return callback(new BadRequestException('Apenas imagens são permitidas!'), false);
      }
      callback(null, true);
    },
  }))
  uploadProdutoImagem(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }
    
    return {
      mensagem: 'Upload realizado com sucesso!',
      imagemUrl: `/uploads/produtos/${file.filename}`
    };
  }
}