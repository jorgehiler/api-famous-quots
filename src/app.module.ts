import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [QuotesModule, TypeOrmModule.forRoot({
    type: "mysql",
    host: "",
    port: 3306,
    username: "root",
    password: "root",
    database: "famous_quote",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
