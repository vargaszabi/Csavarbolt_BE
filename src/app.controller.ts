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

  @Get('api/csavar')
  listCourses() {
    const csavarRepo = this.dataSource.getMongoRepository(Csavar);
    return csavarRepo.find();
  }

  @Post('api/csavar')
  newCourse(@Body() course: Csavar){
    let error = "";
    course.id = undefined;
    if(course.tipus.trim() == "") {
      error = "A csavar tipusának megadása kötelező"
      return error
    }
    if(course.hossz <= 0 || isNaN(course.hossz)) {
      error = "A csavar hosszának megadása kötelező"
      return error
    }
    if(isNaN(course.keszlet) || course.keszlet < 0) {
      error = "A csavar készlet megadása kötelező"
      return error
    }
    if(course.ar <= 0 || isNaN(course.hossz)) {
      error = "A csavar árának megadása kötelező"
      return error
    }
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
