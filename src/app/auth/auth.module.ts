import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }])
    ]
})
export class AuthModule {
    
}