import { LoginComponent } from './login/login.component';
import { GuildMasterComponent } from './guild-master/guild-master.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RewardsToApproveComponent } from './rewards/rewards-to-approve/rewards-to-approve.component';
import { EventsComponent } from './events/events.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { VideosComponent } from './videos/videos.component';
import { AddEventsComponent } from './events/add-events/add-events.component';
import { AddSkinComponent } from './closet/add-skin/add-skin.component';
import { AncientProfileComponent } from './ancient-profile/ancient-profile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { GuildListStartComponent } from './guild-list-start/guild-list-start.component';
import { ClosetComponent } from './closet/closet.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPasswordComponent } from './set-password/set-password.component';
import { WarriorComponent } from './warrior/warrior.component';
import { GuildComponent } from './guild-list-start/guild-list/guild/guild.component';
import { AncientComponent } from './ancient-profile/ancient/ancient.component';
import { AddGuildListComponent } from './guild-list-start/guild-list/add-guild-list/add-guild-list.component';
import { AddUserComponent } from './ancient-profile/ancient/add-user/add-user.component';
import { GuildListComponent } from './guild-list-start/guild-list/guild-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PresenterPageComponent } from './warrior/presenter-page/presenter-page.component';
import { ImageMakerComponent } from './image-maker/image-maker.component';
import { BuySkinComponent } from './closet/buy-skin/buy-skin.component';
import { AddNewVideoComponent } from './videos/add-new-video/add-new-video.component';
import { ForgotpasswordComponent } from './login/forgotpassword/forgotpassword.component';
import { WarningLoginComponent } from './login/warning-login/warning-login.component';
import { ErrorClosetComponent } from './closet/error-closet/error-closet.component';
import { AppConfigurationsComponent } from './app-configurations/app-configurations.component';
import { PathGuardComponent } from './services/pathGuard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'login_warning_message', component: WarningLoginComponent},
    { path: 'set_password', component: SetPasswordComponent },
    { path: 'warrior_profile', component: WarriorComponent },
    { path: 'guild/:idguild', component: GuildComponent },
    { path: 'guildmaster_profile', component: GuildMasterComponent },
    { path: 'ancient_profile', component: AncientProfileComponent, children: [
            { path: '', component: AncientComponent },
            { path: 'add_guild', component: AddGuildListComponent },
            { path: 'add_events', component: AddEventsComponent },
            { path: 'add_user', component: AddUserComponent }
        ]
    },
    { path: 'ancient_profile', component: AncientComponent },
    {path: 'guilds_list', component: GuildListStartComponent, children: [
            { path: '', component: GuildListComponent },
            { path: 'add_guild', component: AddGuildListComponent },
            { path: ':idguild', component: GuildComponent, children: [
                    { path: '', component: GuildComponent },
                    { path: ':id', component: PresenterPageComponent }
                ]
            }
        ]
    },
    { path: 'list_users', component: ListUsersComponent },
    { path: 'rewards', component: RewardsComponent },
    { path: 'rewards_to_approve', component: RewardsToApproveComponent },
    { path: 'events', component: EventsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'closet', component: ClosetComponent },
    { path: 'buy_skin', component: BuySkinComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'add_new_video', component: AddNewVideoComponent },
    { path: 'add_skin', component: AddSkinComponent },
    { path: 'image', component: ImageMakerComponent },
    { path: 'forgot_password', component: ForgotpasswordComponent },
    { path: 'app-error-closet', component: ErrorClosetComponent},
    { path: 'configurations', component: AppConfigurationsComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes), ReactiveFormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }