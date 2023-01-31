import { Body, Controller, Get, Post, Render, Delete, Param } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';
import { Rendeles } from './rendeles.entity';

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
  async deleteCourse(@Param('id') id: number){
    const csavarRepo = this.dataSource.getRepository(Csavar);
    await csavarRepo.delete(id);
  }

  @Post('/csavar/:id/rendeles')
  async csavarRendeles(@Param('id') id : number, @Body() rendeles : Rendeles ) {
    const rendelesRepo = this.dataSource.getRepository(Rendeles)
    const csavarRepo = this.dataSource.getRepository(Csavar)
    let csavarkeszlet  = (await csavarRepo.findOneBy({id : id})).keszlet
    if(csavarkeszlet - rendeles.db < 0 ) {
      return { error: "Nincs elég csavar" }
    } else {
      csavarRepo.update({id : id}, {keszlet : csavarkeszlet-rendeles.db })

      let keszrendeles : Rendeles = {id : undefined, csavar_id : id,  db : rendeles.db  }
      rendelesRepo.save(keszrendeles)
      return {osszertek : rendeles.db * (await csavarRepo.findOneBy({id : id})).ar }
    }

  }
}
