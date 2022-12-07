import {
    Controller,
    UseGuards,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common'
import { AdminGuard } from 'auth/utils/LocalGuard'
import { CategoryService } from './category.service'
import {
    CreateCategoryDto, UpdateCategoryDto,
} from 'dto'

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    getCategories() {
        return this.categoryService.getCategories()
    }

    @Get(':id')
    getCategory(@Param('id') id: number) {
        return this.categoryService.getCategory(id)
    }

    @UseGuards(AdminGuard)
    @Post()
    createCategory(@Body() category: CreateCategoryDto) {
        return this.categoryService.createCategory(category)
    }

    @UseGuards(AdminGuard)
    @Put(':id')
    updateCategory(@Param('id') id: number, @Body() category: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, category)
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    deleteCategory(@Param('id') id: number) {
        return this.categoryService.deleteCategory(id)
    }
}
