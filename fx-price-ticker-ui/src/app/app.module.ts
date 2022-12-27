import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableComponent } from 'src/app/table/table.component';
import { interceptorProviders } from 'src/interceptors/interceptors';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
