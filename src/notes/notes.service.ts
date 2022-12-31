import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Notes } from 'entities'
import { Repository } from 'typeorm'

@Injectable()
export class NotesService {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    @InjectRepository(Notes)
    private readonly noteRepository: Repository<Notes>
  ) { }

  async getNotes (): Promise<Notes[]> {
    return await this.noteRepository.find()
  }

  async getNote (id: number): Promise<Notes> {
    const note = await this.noteRepository.findOne({
      where: {
        id
      }
    })
    return note
  }
}
