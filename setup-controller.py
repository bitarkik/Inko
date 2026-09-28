import re

with open('apps/server/src/orders/orders.controller.ts', 'r', encoding='utf-8') as f:
    code = f.read()

imports = """import { Controller, Post, Body, Param, Patch, Get, UseInterceptors, UploadedFile, Res, StreamableFile, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as multerS3 from 'multer-s3';

// Initialize S3 client for Cloudflare R2
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});
"""

# Replace all imports up to @Controller
pattern_imports = r"import \{ Controller.*?from 'path';\n"
code = re.sub(pattern_imports, imports, code, flags=re.DOTALL)


# Replace createOrder
pattern_create = r"  @UseInterceptors\(FileInterceptor\('document', \{ dest: './uploads' \}\)\)\n  createOrder\(\n    @UploadedFile\(\) file: Express\.Multer\.File,\n    @Body\(\) createOrderDto: CreateOrderDto,\n  \) \{\n    return this\.ordersService\.createOrder\(createOrderDto, file\.path\);\n  \}"

new_create = """  @UseInterceptors(FileInterceptor('document', {
    storage: multerS3({
      s3: s3,
      bucket: process.env.R2_BUCKET_NAME || 'printpanda-uploads',
      acl: 'private',
      key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'orders/' + uniqueSuffix + '-' + file.originalname);
      }
    })
  }))
  createOrder(
    @UploadedFile() file: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    // Save the R2 object key instead of the local path
    return this.ordersService.createOrder(createOrderDto, file.key);
  }"""

code = re.sub(pattern_create, new_create, code)


# Replace download
pattern_download = r"  @Get\(':id/download'\).*?return new StreamableFile\(file\);\n  \}"

new_download = """  @Get(':id/download')
  async downloadOrderFile(@Param('id') id: string, @Res() res: Response) {
    const order = await this.ordersService.findOne(id);
    if (!order || !order.fileUrl) {
      throw new NotFoundException('File not found for this order');
    }

    if (order.fileUrl.startsWith('orders/')) {
       // It's an R2 key, generate a short-lived presigned URL
       const command = new GetObjectCommand({
         Bucket: process.env.R2_BUCKET_NAME || 'printpanda-uploads',
         Key: order.fileUrl,
         ResponseContentDisposition: `inline; filename="order-${id}.pdf"`,
         ResponseContentType: 'application/pdf',
       });
       
       try {
         const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
         return res.redirect(url);
       } catch (error) {
         console.error('Error generating presigned URL:', error);
         throw new BadRequestException('Could not access document file');
       }
    } else {
       // Legacy local files (if any still exist)
       const file = createReadStream(join(process.cwd(), order.fileUrl));
       res.set({
         'Content-Type': 'application/pdf',
         'Content-Disposition': `inline; filename="order-${id}.pdf"`,
       });
       file.pipe(res);
    }
  }"""

code = re.sub(pattern_download, new_download, code, flags=re.DOTALL)

with open('apps/server/src/orders/orders.controller.ts', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
