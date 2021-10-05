import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {SearchPipe} from "./Pipes/search.pipe";
import {FormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations:[SearchPipe],
  imports: [HttpClientModule, FormsModule, NgxSpinnerModule],
  exports: [HttpClientModule, SearchPipe, FormsModule, NgxSpinnerModule]
})
export class SharedModule {

}
