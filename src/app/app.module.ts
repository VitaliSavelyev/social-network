import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { UserComponent } from './shared/components/user/user.component';
import {SharedModule} from "./shared/shared.module";
import { NgbModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "./admin/shared/services/auth.service";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MissingTranslationService} from "./shared/missing-translation.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    UsersListComponent,
    DetailsPageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
