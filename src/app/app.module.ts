import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaAuthInterceptor, MiaAuthModule, MIA_AUTH_PROVIDER } from '@agencycoda/mia-auth';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MiaCoreModule, MIA_GOOGLE_STORAGE_PROVIDER } from '@agencycoda/mia-core';
import { MiaTableModule } from '@agencycoda/mia-table';
import { MiaFormModule } from '@agencycoda/mia-form';
import { MiaLoadingModule } from '@agencycoda/mia-loading';
import { ClientTableComponent } from './client-table/client-table.component';
import { TableActionsButtonsComponent } from './components/table-actions-buttons/table-actions-buttons.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { PropertyToNameModule } from './pipes/property-to-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientTableComponent,
    TableActionsButtonsComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PropertyToNameModule,

    // Agency Coda Modules
    MiaCoreModule,
    MiaAuthModule,
    MiaTableModule,
    MiaLoadingModule,
    MiaFormModule,
  ],
  providers: [
    { 
      provide: MIA_AUTH_PROVIDER, 
      useValue: {
        baseUrl: environment.baseUrl
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiaAuthInterceptor,
      multi: true
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useValue: {
        bucket: environment.cloudStorageBucket
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
