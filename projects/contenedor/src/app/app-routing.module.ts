import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'layout/home',
    pathMatch: 'full'
  },
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
  }
  /*  { path: '/hhh', redirectTo: '/home', pathMatch: 'full' },*/

  /*{
    path: 'microfrontend01',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'microfrontend01',
        remoteEntry: "http://localhost:9080/remoteEntry.js",
        exposedModule: 'Modulo'
      }).then(m => {
        return m.AppModule
      })
  },*/
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {
        onSameUrlNavigation: 'reload',
        useHash: true
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


