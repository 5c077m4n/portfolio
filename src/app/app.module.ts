import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialStyleModule } from './modules/material-style/material-style.module';
import { AppComponent } from './app.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormatNumberCommasPipe } from './pipes/format-number-commas.pipe';
import { ModuleItemComponent } from './components/module-item/module-item.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
	declarations: [
		AppComponent,
		ProjectItemComponent,
		ProjectListComponent,
		FooterComponent,
		FormatNumberCommasPipe,
		ModuleItemComponent,
		ModuleListComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		FormsModule,
		MaterialStyleModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
