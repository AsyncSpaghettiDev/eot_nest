import {
  Controller,
  Get,
  Param
} from '@nestjs/common'
import { NotesService } from './notes.service'

@Controller('notes')
export class NotesController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private NotesService: NotesService) { }

  @Get()
  getNotes () {
    return this.NotesService.getNotes()
  }

  @Get(':id')
  getNote (@Param('id') id: number) {
    return this.NotesService.getNote(id)
  }
}
