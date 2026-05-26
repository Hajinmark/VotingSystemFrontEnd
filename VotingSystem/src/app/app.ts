import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('VotingSystem');

  constructor(private toastr: ToastrService) {}

  // protected showSuccess(): void {
  //   this.toastr.success('Toastr is configured correctly!', 'Success');
  // }
}
