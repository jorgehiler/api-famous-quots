import { Controller, Get, Param, Delete} from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('/api/v1/generate-changing-life-quote')
export class QuotesController {
    constructor(private quotesService: QuotesService) { }

    @Get()
    async newQuote() {
        return this.quotesService.newQuote();
    }

    @Get('/all')
    async findAll(){
        return this.quotesService.findAllQuotes();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.quotesService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        return this.quotesService.delete(id);
    }
}
