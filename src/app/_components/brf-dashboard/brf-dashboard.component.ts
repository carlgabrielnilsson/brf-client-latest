import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Chart } from 'angular-highcharts';
import { BrfCalculatorService } from 'src/app/_services/brf-calculator.service';
import { BrfParams } from '../../_models/brf-params';
import { brfDoughnutChartOptions } from './brf-doughnut-chart';
import { NgxPrintElementService } from 'ngx-print-element';

@Component({
  selector: 'app-brf-dashboard',
  templateUrl: './brf-dashboard.component.html',
  styleUrls: ['./brf-dashboard.component.css'],
})
export class BrfDashboardComponent implements OnInit {


  @ViewChild('ratioLoans') ratioLoans!: ElementRef;
  @ViewChild('riskTextLoans') riskTextLoans!: ElementRef;
  @ViewChild('riskTextLoansAcc') riskTextLoansAcc!: ElementRef;
  progressLoans = "";
  progressColor = "";

  @ViewChild('riskTextSavings') riskTextSavings!: ElementRef;
  @ViewChild('riskTextSavingsAcc') riskTextSavingsAcc!: ElementRef;
  @ViewChild('ratioSavings') ratioSavings!: ElementRef;
  progressSavings = "";
  progressSavingsColor = "";

  @ViewChild('riskTextOperatingFee') riskTextOperatingFee!: ElementRef;
  @ViewChild('riskTextOperatingFeeAcc') riskTextOperatingFeeAcc!: ElementRef;
  @ViewChild('ratioOperatingFee') ratioOperatingFee!: ElementRef;
  progressOperatingFee = "";
  progressOperatingFeeColor = "";

  @ViewChild('riskTextAnnualFeeSqm') riskTextAnnualFeeSqm!: ElementRef;
  @ViewChild('riskTextAnnualFeeSqmAcc') riskTextAnnualFeeSqmAcc!: ElementRef;
  @ViewChild('ratioAnnualFeeSqm') ratioAnnualFeeSqm!: ElementRef;
  progressAnnualFeeSqm = "";
  progressAnnualFeeSqmColor = "";

  @ViewChild('riskTextProportionResult') riskTextProportionResult!: ElementRef;
  @ViewChild('ratioProportionResult') ratioProportionResult!: ElementRef;
  progressProportionResult = "";
  progressProportionResultColor = "";

  @ViewChild('riskTextProportionAmortization') riskTextProportionAmortization!: ElementRef;
  @ViewChild('ratioProportionAmortization') ratioProportionAmortization!: ElementRef;
  progressProportionAmortization = "";
  progressProportionAmortizationColor = "";

  @ViewChild('sliderValue') sliderValue!: ElementRef;

  @ViewChild('hidden') hidden!: ElementRef;
  @ViewChild('hidden1') hidden1!: ElementRef;
  @ViewChild('hidden2') hidden2!: ElementRef;
  @ViewChild('hidden3') hidden3!: ElementRef;
  @ViewChild('hidden4') hidden4!: ElementRef;
  @ViewChild('hidden5') hidden5!: ElementRef;
  @ViewChild('hidden6') hidden6!: ElementRef;
  @ViewChild('hidden7') hidden7!: ElementRef;
  @ViewChild('print') printArea!: ElementRef;

  @ViewChild('yes1') hasFullValueInsurance!: ElementRef;
  @ViewChild('no1') notFullValueInsurance!: ElementRef;
  @ViewChild('yes2') hasResponsibilityInsurance!: ElementRef;
  @ViewChild('no2') notResponsibilityInsurance!: ElementRef;
  @ViewChild('yes3') ownsProperty!: ElementRef;
  @ViewChild('no3') notOwnProperty!: ElementRef;
  @ViewChild('yes4') hasRightToProperty!: ElementRef;
  @ViewChild('no4') notRightToProperty!: ElementRef;
  @ViewChild('yes5') hasTechPlan!: ElementRef;
  @ViewChild('no5') notTechPlan!: ElementRef;

  radio1!: string;
  radio2!: string;
  radio3!: string;
  radio4!: string;
  radio5!: string;

  @ViewChild('stepper') stepper!: MatStepper;


  //slider Options
  disabled = false;
  max = 15;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  //Variables
  public responseData?: BrfParams;
  public brfParams: BrfParams = new BrfParams;

  //For SLider
  whatIfInterestIncrease!: number;

  //For chart
  totalRevenue!: number;
  commercialRevenue!: number;
  ratioCommercialRevenue!: number;
  doughnutChart!: Chart;


  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Swedbank AB (Publ)',
    templateString: '',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: []
  }

  constructor(
    private brfService: BrfCalculatorService,
    private rendered: Renderer2,
    public print: NgxPrintElementService
  ) { }

  ngOnInit(): void {
    this.doughnutChart = new Chart(brfDoughnutChartOptions(0, 0, 0));
  }

  ngOnChanges(): void {
    this.whatIfInterestIncr();
  }

  public onCalculateBrf(brfForm: NgForm): void {
    this.hideValues();
    this.brfService.onCalcBrf(brfForm.value).subscribe({
      next: (response: BrfParams) => {
        console.log(response);
        this.responseData = response;
        this.onConditionFormatting(response);
        this.sendParamsToChart(response);
        //brfForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    })
  }

  public resetBrfForm(brfForm: NgForm): void {
    brfForm.reset();
  }

  public onConditionFormatting(responseData: BrfParams): void {
    //Loans
    if (responseData?.proportionOfAssociationLoans != undefined) {

      if (responseData.proportionOfAssociationLoans <= 3000) {
        this.ratioLoans.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextLoans.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextLoans.nativeElement.innerText = 'Låg';
        this.riskTextLoansAcc.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextLoansAcc.nativeElement.innerText = 'Låg';
        this.progressLoans = "25";
        this.progressColor = "primary"
      }
      else if (responseData.proportionOfAssociationLoans > 3000 && responseData.proportionOfAssociationLoans < 6000) {

        this.ratioLoans.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextLoans.nativeElement.style.color = 'rgb(97, 97, 192)';
        this.riskTextLoans.nativeElement.innerText = 'Låg till måttlig';
        this.riskTextLoansAcc.nativeElement.style.color = 'rgb(97, 97, 192)';
        this.riskTextLoansAcc.nativeElement.innerText = 'Låg till måttlig';
        this.progressLoans = "50";
        this.progressColor = "accent"

      }
      else if (responseData.proportionOfAssociationLoans >= 6000 && responseData.proportionOfAssociationLoans < 9000) {

        this.ratioLoans.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextLoans.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextLoans.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextLoansAcc.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextLoansAcc.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.progressLoans = "75";
        this.progressColor = "accent"
      }
      else {
        this.ratioLoans.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextLoans.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextLoans.nativeElement.innerText = 'Hög';
        this.riskTextLoansAcc.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextLoansAcc.nativeElement.innerText = 'Hög';
        this.progressLoans = "100";
        this.progressColor = "warn"
      }
    }
    //Savings
    if (responseData?.proportionOfAssociationSavings != undefined) {
      if (responseData.proportionOfAssociationSavings <= 100) {

        this.ratioSavings.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextSavings.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextSavings.nativeElement.innerText = 'Låg';
        this.riskTextSavingsAcc.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextSavingsAcc.nativeElement.innerText = 'Låg';
        this.progressSavings = "25";
        this.progressSavingsColor = "warn"

      }
      else if (responseData.proportionOfAssociationSavings > 100 && responseData.proportionOfAssociationSavings < 150) {

        this.ratioSavings.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextSavings.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextSavings.nativeElement.innerText = 'Låg till måttlig';
        this.riskTextSavingsAcc.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextSavingsAcc.nativeElement.innerText = 'Låg till måttlig';
        this.progressSavings = "50";
        this.progressSavingsColor = "accent"
      }
      else if (responseData.proportionOfAssociationSavings >= 150 && responseData.proportionOfAssociationSavings < 200) {
        this.ratioSavings.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextSavings.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextSavings.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextSavingsAcc.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextSavingsAcc.nativeElement.innerText = 'Måttlig till hög';
        this.progressSavings = "75";
        this.progressSavingsColor = "accent"
      }
      else {
        this.ratioSavings.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextSavings.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextSavings.nativeElement.innerText = 'Hög';
        this.riskTextSavingsAcc.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextSavingsAcc.nativeElement.innerText = 'Hög';
        this.progressSavings = "100";
        this.progressSavingsColor = "primary"
      }
    }

    //Operating Costs
    if (responseData?.operatingCostSqm != undefined) {
      if (responseData.operatingCostSqm <= 375) {

        this.ratioOperatingFee.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextOperatingFee.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextOperatingFee.nativeElement.innerText = 'Låg';
        this.riskTextOperatingFeeAcc.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextOperatingFeeAcc.nativeElement.innerText = 'Låg';
        this.progressOperatingFee = "25";
        this.progressOperatingFeeColor = "primary"

      }
      else if (responseData.operatingCostSqm > 375 && responseData.operatingCostSqm < 450) {
        this.ratioOperatingFee.nativeElement.style.color = 'rgb(97, 97, 192)';
        this.riskTextOperatingFee.nativeElement.innerText = 'Låg till måttlig';
        this.riskTextOperatingFee.nativeElement.style.color = 'rgb(97, 97, 192)';
        this.riskTextOperatingFeeAcc.nativeElement.innerText = 'Låg till måttlig';
        this.riskTextOperatingFeeAcc.nativeElement.style.color = 'rgb(97, 97, 192)';
        this.progressOperatingFee = "50";
        this.progressOperatingFeeColor = "accent"
      }
      else if (responseData.operatingCostSqm >= 450 && responseData.operatingCostSqm < 550) {
        this.ratioOperatingFee.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextOperatingFee.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextOperatingFee.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextOperatingFeeAcc.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextOperatingFeeAcc.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.progressOperatingFee = "75";
        this.progressOperatingFeeColor = "accent"
      }
      else {
        this.ratioOperatingFee.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextOperatingFee.nativeElement.innerText = 'Hög';
        this.riskTextOperatingFee.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextOperatingFeeAcc.nativeElement.innerText = 'Hög';
        this.riskTextOperatingFeeAcc.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.progressOperatingFee = "100";
        this.progressOperatingFeeColor = "warn"
      }
    }
    //Annual Fee
    if (responseData?.annualFeeSqm != undefined) {
      if (responseData.annualFeeSqm <= 325) {

        this.ratioAnnualFeeSqm.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextAnnualFeeSqm.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextAnnualFeeSqm.nativeElement.innerText = 'Låg';
        this.riskTextAnnualFeeSqmAcc.nativeElement.style.color = 'rgb(100, 192, 88)';
        this.riskTextAnnualFeeSqmAcc.nativeElement.innerText = 'Låg';
        this.progressAnnualFeeSqm = "25";
        this.progressAnnualFeeSqmColor = "primary"

      }
      else if (responseData.annualFeeSqm > 325 && responseData.annualFeeSqm < 650) {

        this.ratioAnnualFeeSqm.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextAnnualFeeSqm.nativeElement.innerText = 'Låg till måttlig';
        this.riskTextAnnualFeeSqm.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextAnnualFeeSqmAcc.nativeElement.innerText = 'Låg till måttlig';
        this.riskTextAnnualFeeSqmAcc.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.progressAnnualFeeSqm = "50";
        this.progressAnnualFeeSqmColor = "accent"



      }
      else if (responseData.annualFeeSqm >= 650 && responseData.annualFeeSqm < 900) {
        this.ratioAnnualFeeSqm.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextAnnualFeeSqm.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextAnnualFeeSqm.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.riskTextAnnualFeeSqmAcc.nativeElement.innerText = 'Måttlig till hög';
        this.riskTextAnnualFeeSqmAcc.nativeElement.style.color = 'rgb(230, 100, 95)';
        this.progressAnnualFeeSqm = "75";
        this.progressAnnualFeeSqmColor = "accent"
      }
      else {
        this.ratioAnnualFeeSqm.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextAnnualFeeSqm.nativeElement.innerText = 'Hög';
        this.riskTextAnnualFeeSqm.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.riskTextAnnualFeeSqmAcc.nativeElement.innerText = 'Hög';
        this.riskTextAnnualFeeSqmAcc.nativeElement.style.color = 'rgb(223, 52, 52)';
        this.progressAnnualFeeSqm = "100";
        this.progressAnnualFeeSqmColor = "warn"
      }
    }
  }

  public sendParamsToChart(responseData: BrfParams): void {
    this.totalRevenue = responseData.totalRevenue!
    this.commercialRevenue = responseData.commercialRevenue!
    this.ratioCommercialRevenue = responseData.ratioCommercialRevenue!
    this.doughnutChart = new Chart(brfDoughnutChartOptions(this.totalRevenue, this.commercialRevenue, this.ratioCommercialRevenue));
  }

  public whatIfInterestIncr(): void {
    console.log(this.value)
    if (this.responseData?.proportion != undefined && this.responseData.loans != undefined) {
      this.hidden7.nativeElement.style.display = "none";
      this.whatIfInterestIncrease = this.responseData.proportion * ((this.responseData.loans) * (this.value / 100)) / 12
    }
    console.log(this.value)
  }

  public hideValues(): void {
    this.hidden.nativeElement.style.display = "none"
    this.hidden1.nativeElement.style.display = "none"
    this.hidden2.nativeElement.style.display = "none"
    this.hidden3.nativeElement.style.display = "none"
    this.hidden4.nativeElement.style.display = "none"
    this.hidden5.nativeElement.style.display = "none"
    this.hidden6.nativeElement.style.display = "none"
  }

  public onPrint(): void {
    this.printArea.nativeElement.style.display = "grid"
  }

  public radioAnsweres(): void {
    if (this.hasFullValueInsurance.nativeElement.checked) {
      this.radio1 === "Ja"
    }
    else {
      this.radio1 === "Nej"
    }
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

