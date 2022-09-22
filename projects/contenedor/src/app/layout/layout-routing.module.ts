import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
      },
     /* {
        path: 'microfrontend01',
        loadChildren: () => import('microfrontend01/Module').then((m) => m.AppModule)
      },*/
      {
        path: 'microfrontend01',
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'microfrontend01',
            remoteEntry: "http://localhost:4000/remoteEntry.js",
            exposedModule: './Module'
          }).then(m => {
            return m.AppModule
          })
      },
      {
        path: 'microfrontend02',
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'microfrontend02',
            remoteEntry: "http://localhost:4100/remoteEntry.js",
            exposedModule: './Module'
          }).then(m => {
            return m.AppModule
          })
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
