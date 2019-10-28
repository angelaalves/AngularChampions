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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WarriorComponent } from './warrior/warrior.component';
import { GuildComponent } from './guild-list-start/guild-list/guild/guild.component';
import { AncientComponent } from './ancient-profile/ancient/ancient.component';
import { AddGuildListComponent } from './guild-list-start/guild-list/add-guild-list/add-guild-list.component';
import { AddUserComponent } from './ancient-profile/ancient/add-user/add-user.component';
import { GuildListComponent } from './guild-list-start/guild-list/guild-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PresenterPageComponent } from './warrior/presenter-page/presenter-page.component';
import { ImageMakerComponent } from './image-maker/image-maker.component';

const appRoutes: Routes=[
    {path: '', redirectTo: '/login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'set_password', component: SetPasswordComponent},
    {path: 'change_password', component: ChangePasswordComponent},
    {path: 'warrior_profile', component: WarriorComponent},
    {path: 'guild', component: GuildComponent},
    {path: 'guildmaster_profile', component: GuildMasterComponent},
    {path: 'ancient_profile', component: AncientProfileComponent, children:[
        {path: '', component: AncientComponent},
        {path: 'add_guild', component: AddGuildListComponent},
        {path: 'add_events', component: AddEventsComponent}, 
        {path: 'add_skin', component: AddSkinComponent},
        {path: 'add_user', component: AddUserComponent},
        {path: 'add_guild', component: AddGuildListComponent}
    ]},
    {path: 'ancient_profile', component: AncientComponent},
    {path: 'guilds_list', component: GuildListStartComponent, children:[
        {path:'', component: GuildListComponent},
        {path: ':id', component: GuildComponent, children:[
            {path:'', component: GuildComponent},
            {path: ':id', component: PresenterPageComponent}
        ]},
        {path:'add_guild', component: AddGuildListComponent}
    ]},
    {path: 'list_users', component: ListUsersComponent},
    {path: 'rewards', component: RewardsComponent},
    {path: 'rewards_to_approve', component: RewardsToApproveComponent},
    {path: 'events', component: EventsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'closet', component: ClosetComponent},
    {path: 'videos', component: VideosComponent},
    {path: 'add_skin', component: AddSkinComponent},
    {path: 'image', component: ImageMakerComponent},
    
 ]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes), ReactiveFormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }