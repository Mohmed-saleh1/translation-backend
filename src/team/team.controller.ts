// src/team/team.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTeamDto })
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const folderName = 'teams';
    return this.teamService.create(createTeamDto, folderName, file);
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Patch('feature')
  async updateFeature(@Param('id') id: number) {
    return this.teamService.toggleFeatureTeamMember(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.teamService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateTeamDto })
  async update(
    @Param('id') id: number,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.teamService.update(id, updateTeamDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.teamService.remove(id);
  }
}
