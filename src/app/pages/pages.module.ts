import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CreditoComponent } from './credito/credito.component';
import { DebitoComponent } from './debito/debito.component';
import { MetasComponent } from './metas/metas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TuiDataListWrapperModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { ModalCreditoComponent } from './modal-credito/modal-credito.component';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiDataListModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TuiAvatarModule} from '@taiga-ui/kit';
import {TuiLetModule} from '@taiga-ui/cdk';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TuiInputDateModule} from '@taiga-ui/kit';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [LayoutComponent, CreditoComponent, DebitoComponent, MetasComponent, ModalCreditoComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    TuiTagModule,
    TuiDialogModule,
    TuiRootModule,
    TuiCurrencyPipeModule,
    TuiInputNumberModule,
    TuiDataListModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiLetModule,
    MatAutocompleteModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputDateModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [LayoutComponent]
})
export class PagesModule { }
