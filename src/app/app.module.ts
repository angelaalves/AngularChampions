import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WarriorComponent } from './warrior/warrior.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { WarriorDetailsComponent } from './warrior/warrior-details/warrior-details.component';
import { WarriorDetailsXPComponent } from './warrior/warrior-details/warrior-details-xp/warrior-details-xp.component';
import { WarriorDetailsCoinsComponent } from './warrior/warrior-details/warrior-details-coins/warrior-details-coins.component';
import { WarriorDetailsButtonsComponent } from './warrior/warrior-details/warrior-details-buttons/warrior-details-buttons.component';
import { WarriorDefinitionsComponent } from './warrior/warrior-definitions/warrior-definitions.component';
import { ClosetComponent } from './closet/closet.component';
import { AppRoutingModule } from './app-routing.module';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClosetImageComponent } from './closet/closet-image/closet-image.component';
import { ClosetSkinsComponent } from './closet/closet-skins/closet-skins.component';
import { LoginComponent } from './login/login.component';
import { GuildMasterComponent } from './guild-master/guild-master.component';
import { GuildMasterDefinitionsComponent } from './guild-master/guild-master-definitions/guild-master-definitions.component';
import { GuildMasterDetailsComponent } from './guild-master/guild-master-details/guild-master-details.component';
import { GuildMasterDetailsButtonsComponent } from './guild-master/guild-master-details/guild-master-details-buttons/guild-master-details-buttons.component';
import { GuildMasterDetailsCoinsComponent } from './guild-master/guild-master-details/guild-master-details-coins/guild-master-details-coins.component';
import { GuildMasterDetailsXpComponent } from './guild-master/guild-master-details/guild-master-details-xp/guild-master-details-xp.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { VideosComponent } from './videos/videos.component';
import { RewardsToApproveComponent } from './rewards/rewards-to-approve/rewards-to-approve.component';
import { AddSkinComponent } from './closet/add-skin/add-skin.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EventsElemComponent } from './events/events-elem/events-elem.component';
import { AuthenticationComponent } from './login/authentication/authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEventsComponent } from './events/add-events/add-events.component';
import { AncientProfileComponent } from './ancient-profile/ancient-profile.component';
import { GuildListStartComponent } from './guild-list-start/guild-list-start.component';
import { PlayerService } from './services/player.service';
import { GuildComponent } from './guild-list-start/guild-list/guild/guild.component';
import { GuildMemberComponent } from './guild-list-start/guild-list/guild/guild-member/guild-member.component';
import { AncientComponent } from './ancient-profile/ancient/ancient.component';
import { AncientDetailsComponent } from './ancient-profile/ancient/ancient-details/ancient-details.component';
import { AncientDefinitionsComponent } from './ancient-profile/ancient/ancient-definitions/ancient-definitions.component';
import { AddUserComponent } from './ancient-profile/ancient/add-user/add-user.component';
import { GuildListComponent } from './guild-list-start/guild-list/guild-list.component';
import { GuildListElemComponent } from './guild-list-start/guild-list/guild-list-elem/guild-list-elem.component';
import { AddGuildListComponent } from './guild-list-start/guild-list/add-guild-list/add-guild-list.component';
import { PresenterPageComponent } from './warrior/presenter-page/presenter-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageMakerComponent } from './image-maker/image-maker.component';
import { BuySkinComponent } from './closet/buy-skin/buy-skin.component';
import { SkinOtherComponent } from './closet/closet-skins/skin-other/skin-other.component';
import { SkinShoesComponent } from './closet/closet-skins/skin-shoes/skin-shoes.component';
import { SkinSkincolorComponent } from './closet/closet-skins/skin-skincolor/skin-skincolor.component';
import { SkinTopComponent } from './closet/closet-skins/skin-top/skin-top.component';
import { SkinBottomComponent } from './closet/closet-skins/skin-bottom/skin-bottom.component';
import { SkinHairComponent } from './closet/closet-skins/skin-hair/skin-hair.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PreviewSkinComponent } from './closet/add-skin/preview-skin/preview-skin.component';
import { SessionService } from './services/session.service';
import { GuildmasterPresenterPageComponent } from './guild-master/guildmaster-presenter-page/guildmaster-presenter-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WarriorComponent,
    DropdownDirective,
    WarriorDetailsComponent,
    WarriorDetailsXPComponent,
    WarriorDetailsCoinsComponent,
    WarriorDetailsButtonsComponent,
    WarriorDefinitionsComponent,
    ClosetComponent,
    SetPasswordComponent,
    ChangePasswordComponent,
    ClosetImageComponent,
    ClosetSkinsComponent,
    LoginComponent,
    GuildComponent,
    GuildMemberComponent,
    GuildMasterComponent,
    GuildMasterDefinitionsComponent,
    GuildMasterDetailsComponent,
    GuildMasterDetailsButtonsComponent,
    GuildMasterDetailsCoinsComponent,
    GuildMasterDetailsXpComponent,
    AncientComponent,
    AncientDetailsComponent,
    AncientDefinitionsComponent,
    AddUserComponent,
    GuildListComponent,
    GuildListElemComponent, 
    EventsComponent,
    NotificationsComponent,
    RewardsComponent, 
    VideosComponent,
    RewardsComponent,
    RewardsToApproveComponent,
    AddGuildListComponent,
    VideosComponent, 
    AddSkinComponent, 
    ListUsersComponent, 
    EventsElemComponent,
    VideosComponent, 
    AddSkinComponent,
    AuthenticationComponent,
    AddEventsComponent,
    AncientProfileComponent,
    GuildListStartComponent,
    ImageMakerComponent,
    BuySkinComponent,
    SkinHairComponent,
    SkinOtherComponent,
    SkinShoesComponent,
    SkinSkincolorComponent,
    SkinTopComponent,
    SkinBottomComponent,
    ProfilePageComponent,
    GuildmasterPresenterPageComponent,
    PresenterPageComponent,

    PreviewSkinComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [PlayerService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }