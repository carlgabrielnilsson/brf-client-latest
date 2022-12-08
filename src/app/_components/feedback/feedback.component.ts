import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, Renderer2, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public snackBarDuration: number = 2000;


  //slider Options
  disabled = false;
  max = 5;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;
  //For SLider

  constructor(
    private feedbackService: FeedbackService,
    private rendered: Renderer2
  ) { }

  ngOnInit(): void {
    console.log(this.value)
  }

  ngOnChanges(): void {
    this.onRating();
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

  public onRating(): void {
    if (!this.value) {
      console.log(this.value)
    }
    this.value
    console.log(this.value)
  }

  public formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 15) {
      return Math.round(value / 1000) + 'k' + 'Im a very long label';
    }

    return value;
  }

  public hoverSlider() {
    const thumbEle = document.querySelector('div.mat-slider-thumb-label');
    this.rendered.setStyle(thumbEle, 'transform', 'rotate(0)');
  }

  public blurSlider() {
    const thumbEle = document.querySelector('div.mat-slider-thumb-label');
    this.rendered.removeStyle(thumbEle, 'transform');
  }
}