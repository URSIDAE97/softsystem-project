import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { BetsComponent } from './bets/bets.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AlertModule } from 'ngx-bootstrap';
import { EditEventsComponent, DeleteEventModal, EditEventModal, CreateEventModal} from './admin-panel/edit-events/edit-events.component';
import { EditTeamsComponent, EditTeamsModalDelete, EditTeamsModalAdd, EditTeamsModalEdit } from './admin-panel/edit-teams/edit-teams.component';
import { EditPlayersComponent, RemovePlayerDialog, PlayerEditDialog, AddPlayerDialog} from './admin-panel/edit-players/edit-players.component';
import { EditUsersComponent, RemoveUserDialog } from './admin-panel/edit-users/edit-users.component';
import { PlayerService } from './services/player.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'
import { EventService } from './services/event.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TeamService } from './services/team.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { UserService } from './services/user.service';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './registration/registration.service';
import { LoginComponent } from './login/login.component';
import { LocalStorageService } from './services/localStorage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { BetsService } from './services/bets.service';

const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    BetsComponent,
    AdminPanelComponent,
    EditEventsComponent,
    EditTeamsComponent,
    EditPlayersComponent,
    EditUsersComponent,
    DeleteEventModal,
    EditEventModal,
    CreateEventModal,
    RemovePlayerDialog,
    PlayerEditDialog,
    AddPlayerDialog,
    EditTeamsModalDelete,
    EditTeamsModalAdd,
    EditTeamsModalEdit,
    RemoveUserDialog,
    RegistrationComponent,
    RemoveUserDialog,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    MatExpansionModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    MatListModule,
    MatButtonModule,
    MatCardModule,
    NgbModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    DeleteEventModal,
    EditEventModal,
    CreateEventModal,
    RemovePlayerDialog,
    PlayerEditDialog,
    AddPlayerDialog,
    EditTeamsModalDelete,
    EditTeamsModalAdd,
    EditTeamsModalEdit,
    RemoveUserDialog
  ],
  providers: [
    PlayerService,
    EventService,
    TeamService,
    UserService,
    RegistrationService,
    LocalStorageService,
    BetsService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
