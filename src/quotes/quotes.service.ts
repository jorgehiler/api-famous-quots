import { Injectable, HttpService} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteModel } from './quote.model';
import { Quote } from './quote.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from "axios";

@Injectable()
export class QuotesService {
    constructor(@InjectRepository(Quote) 
    private repository: Repository<Quote>, 
    private http: HttpService) { }

    async findAllQuotes() {
        return await this.repository.find();
    }

    async findById(id: number) {
        let result = await this.repository.find({ where: { id } });
        return result.length == 0 ? { msg: '❌ quote not exist! ' } : result;
    }

    async newQuote() {
        let quoteauthor;
        try {
            let oberserquoteAuthor: Observable<AxiosResponse<any>> = this.http.get('https://api.quotable.io/random');
            quoteauthor = await oberserquoteAuthor.toPromise();
        } catch (_e) {
            return
        }

        let author = quoteauthor.data['author'];
        let textQuote = quoteauthor.data['content'];
        let imgUrl = "Image not found"
        try {
            imgUrl = await this.processHtml(author);
        }
        catch (_e) {
            console.log(imgUrl, _e);
        }

        let quote = new QuoteModel(imgUrl, textQuote);
        return this.repository.save(quote)
    }


    async delete(id: number) {
        let quote = await this.repository.findOne({ id });
        console.log(quote);
        if (undefined != quote) {
            this.repository.remove(quote);
            return { msg: " ✅ Successful deletion" }
        }
        return {msg: `❌ Quot ${id} not exist! `}
    }

    async findByQuote(textQuote: String) {
        return this.repository.find({ where: { quote: textQuote } });
    }

    async processHtml(autor: String) {
        let wikipediaBase = `https://en.wikipedia.org/wiki/${autor}`;
        let response: AxiosResponse<any> = await this.http.get(wikipediaBase).toPromise();
        let htmlDoc = response.data;
        let biography = htmlDoc.split("vcard");
        biography = biography[1].split('src="');
        biography = biography[1].split('"');
        let url = biography[0];
        return url;
    }
}  
