import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  asyncTabs: Observable<ExampleTab[]>;
  tabIndex = 0;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Content 1' },
          { label: 'Second', content: 'Content 2' },
          { label: 'Third', content: 'Content 3' },
        ]);
        observer.complete();
      }, 1000);
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    // Puedes agregar lógica aquí si es necesario
    console.log('Cambio de pestaña', event.index);
  }

  navegarSiguiente(): void {
    if (this.tabGroup) {
      this.tabIndex = (this.tabIndex + 1) % this.tabGroup._tabs.length;
      this.tabGroup.selectedIndex = this.tabIndex;
    }
  }

  navegarAtras(): void {
    if (this.tabGroup) {
      this.tabIndex =
        (this.tabIndex - 1 + this.tabGroup._tabs.length) %
        this.tabGroup._tabs.length;
      this.tabGroup.selectedIndex = this.tabIndex;
    }
  }
}
