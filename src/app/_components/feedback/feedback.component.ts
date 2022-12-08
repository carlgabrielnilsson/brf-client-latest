import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/_models/feedback';
import { FeedbackService } from 'src/app/_services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FeedbackComponent implements OnInit {

  //Variables
  public feedback: Feedback = new Feedback;

  //stars

  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr = [];



  constructor(
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log("a " + this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push();
    }
  }

  public onFeedback(feedbackForm: NgForm): void {
    this.feedbackService.onFeedbackSubmit(feedbackForm.value).subscribe({
      next: (response: Feedback) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    })
  }

  onClick(rating: number) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}