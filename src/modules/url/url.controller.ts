import { Body, Controller, Delete, Get, Param, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUrlDto } from './dtos/create-url.dto';
import { UrlResponseDto } from './dtos/url-response.dto';
import { UrlService } from './url.service';

@ApiTags('url')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @ApiOperation({ summary: 'Create a shortened URL' })
  @ApiResponse({ status: 201, type: UrlResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createShortUrl(
    @Body() createUrlDto: CreateUrlDto,
    @Req() req,
  ): Promise<UrlResponseDto> {
    return this.urlService.createShortUrl(createUrlDto, req.user.id);
  }

  @ApiOperation({ summary: 'Get all URLs for the authenticated user' })
  @ApiResponse({ status: 200, type: [UrlResponseDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my-urls')
  async getMyUrls(@Req() req): Promise<UrlResponseDto[]> {
    console.log(req.user, 'Get my urls triggered')
    return this.urlService.getUserUrls(req.user.id);
  }

  @ApiOperation({ summary: 'Delete a URL' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUrl(@Param('id') id: string, @Req() req): Promise<void> {
    console.log('triggered delete', id)
    return this.urlService.deleteUrl(id, req.user.id);
  }

  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({ status: 302, description: 'Redirect to the original URL' })
  @Get(':shortCode')
  // @Redirect()
  async redirectToOriginalUrl(@Param('shortCode') shortCode: string) {
    const originalUrl = await this.urlService.getOriginalUrl(shortCode);
    console.log(originalUrl, 'the orginal url')
    return { url: originalUrl, statusCode: 302 };
  }
}