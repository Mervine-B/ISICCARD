import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { AgentComponent } from './agent/agent.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DasborboadcontentComponent } from './dasborboadcontent/dasborboadcontent.component';
import { StudentComponent } from './student/student.component';


export const routes: Routes = [
    {path: "order", component: OrderComponent},
    {path:"agent",component: AgentComponent},
    {path:"formulaire",component:FormulaireComponent},
    {path:"",   component:DasborboadcontentComponent},
    {path:"student",   component:StudentComponent},


];
