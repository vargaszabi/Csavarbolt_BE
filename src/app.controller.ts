import { Body, Controller, Get, Post, Render, Delete, Param } from '@nestjs/common';
import { DataSource, DeleteDateColumn } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('api/csavar')
  listCourses() {
    const csavarRepo = this.dataSource.getMongoRepository(Csavar);
    return csavarRepo.find();
  }

  @Post('api/csavar')
  newCourse(@Body() course: Csavar){
    course.id = undefined;
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.save(course);
  }

  @Delete('/api/csavar/:id')
  deleteCourse(@Param('id') id: number){
    const csavarRepo = this.dataSource.getRepository(Csavar);
    csavarRepo.delete(id);
  }

  @Post('/csavar/:id/rendeles')
  newRendeles
}
