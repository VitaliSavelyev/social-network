import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable()
export class AlertService {

  constructor(private modalService: NgbModal) { }

  public confirm(): Promise<boolean> {
    const modalRef = this.modalService.open(AlertComponent);
    return modalRef.result;
  }

}
