import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: "app-menu-right",
    templateUrl: "./menu-right.component.html",
    styleUrls: ['./menu-right.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MenuRightComponent implements OnInit {

    companynames = [
        'Ant-Man',
        'Aquaman',
        'Asterix',
        'The Atom',
        'The Avengers',
        'Batgirl',
        'Batman',
        'Batwoman'
    ]

    closeResult: string = '';
    constructor(
        private modalService: NgbModal
    ) {
    }
    ngOnInit() {

    }
    uploadPicture() {
        debugger;
        const imgInt = <HTMLInputElement>document.getElementById('company-image');
        const file = imgInt.files
        if (file) {
            const previewEle = <HTMLImageElement>document.getElementById('preview-show');
            previewEle.src = URL.createObjectURL(file[0])
        }

    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}