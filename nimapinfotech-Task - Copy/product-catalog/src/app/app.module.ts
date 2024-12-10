import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoryMasterComponent } from './components/category-master/category-master.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';

@NgModule({
  declarations: [AppComponent, CategoryMasterComponent, ProductMasterComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
