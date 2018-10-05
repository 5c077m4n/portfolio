import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './components/project-list/project-list.component';
import { ModuleListComponent } from './components/module-list/module-list.component';


const routes: Routes = [
	{ path: '', component: ProjectListComponent, pathMatch: 'full' },
	{ path: 'npm', component: ModuleListComponent, pathMatch: 'full' },
	{ path: '**', redirectTo: '' , pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
