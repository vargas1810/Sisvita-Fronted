import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/registro/registro.component';
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import { DashboardInicialComponent } from './pages/dashboard-inicial/dashboard-inicial.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MapaComponent } from './pages/mapa/mapa.component';

export const routes: Routes = [
    {
        path: '', redirectTo:'login', pathMatch:'full'
    },
    {
        path: 'dashboard-inicial', component: DashboardInicialComponent },

    { path: 'perfil', component: PerfilComponent },
    { path: 'mapa', component: MapaComponent },
    {
        path:'login',
        component:LoginComponent
    },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },


    { path: 'dashboard2', component: Dashboard2Component },

];
