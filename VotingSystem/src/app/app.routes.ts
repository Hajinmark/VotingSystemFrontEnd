import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Election } from './features/election/election';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },

    // Main Application Layout
    {
          path: '',
        component: MainLayout,
        canActivate: [authGuard],

        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                canActivate: [authGuard]
            },
            {
                path: 'election',
                component: Election,
                canActivate: [authGuard]
            }

        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
