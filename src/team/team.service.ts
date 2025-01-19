// src/team/team.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createTeamDto: CreateTeamDto,
    folderName: string,
    file: Express.Multer.File,
  ): Promise<Team> {
    let imagePath = '';
    if (file) {
      imagePath = await this.fileUploadService.uploadFile(file, folderName);
    }

    const team = this.teamRepository.create({
      ...createTeamDto,
      image: imagePath,
    });

    return this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async toggleFeatureTeamMember(id: number) {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Correctly toggle the isFeatured property
    team.isFeatured = !team.isFeatured;

    return await this.teamRepository.save(team);
  }

  async findFeatured(): Promise<Team[]> {
    return this.teamRepository.find({ where: { isFeatured: true } });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }
    return team;
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeamDto,
    file: Express.Multer.File,
  ): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    if (file) {
      if (team.image) {
        await this.fileUploadService.deleteFile(team.image);
      }
      team.image = await this.fileUploadService.uploadFile(file, 'team');
    }

    Object.assign(team, updateTeamDto);
    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    if (team.image) {
      await this.fileUploadService.deleteFile(team.image);
    }

    await this.teamRepository.remove(team);
  }
}
