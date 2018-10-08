import React, { Component } from 'react';
import Calculator from './components/Calculator';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carPrice: '',
			downpayment: '',
			loanTermsYr: '',
			loanTermsMnth: '',
			interestRate: ''
		};

		this.updateCarPrice = this.updateCarPrice.bind(this);
		this.updateDownpayment = this.updateDownpayment.bind(this);
		this.updateLoanTermsYr = this.updateLoanTermsYr.bind(this);
		this.updateLoanTermsMnth = this.updateLoanTermsMnth.bind(this);
		this.updateInterestRate = this.updateInterestRate.bind(this);
	}

	calculateMonthlyPayment(carPrice, downpayment, loanTermsYr, loanTermsMnth, interestRate) {
		const monthlyRate = interestRate / 100 / 12;
		let interest = 0;
		let amortization = [];
		let balance = carPrice;
		let amountPaid = 0;
		if (!carPrice || !loanTermsYr || !loanTermsMnth || !interestRate) {
			return {monthlyPayment: 0, amortization: []};
		} else if (!downpayment) {
			const monthlyPayment = carPrice * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), loanTermsMnth)));
			for (let m = 0; m < loanTermsMnth; m++) {
				const monthlyInterest = balance * monthlyRate;
				const monthlyPrincipal = monthlyPayment - monthlyInterest;
				amountPaid = amountPaid + monthlyPrincipal;
				interest = interest + monthlyInterest;
				balance = balance - monthlyPrincipal;
				amortization.push({amountPaid, interest, balance});
			}
			return {monthlyPayment: monthlyPayment, amortization: amortization};
		} else {
			const newCarPrice = carPrice - downpayment
			const monthlyPayment = newCarPrice * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), loanTermsMnth)));
			for (let m = 0; m < loanTermsMnth; m++) {
				const monthlyInterest = balance * monthlyRate;
				const monthlyPrincipal = monthlyPayment - monthlyInterest;
				amountPaid = amountPaid + monthlyPrincipal;
				interest = interest + monthlyInterest;
				balance = balance - monthlyPrincipal;
				amortization.push({amountPaid, interest, balance});
			}
			return {monthlyPayment: monthlyPayment, amortization: amortization};
		}
	}

	updateCarPrice(e) {
		this.setState({carPrice: e});
	}

	updateDownpayment(e) {
		this.setState({downpayment: e});
	}
	
	updateLoanTermsYr(e) {
		if (this.state.loanTermsMnth !== e * 12) {
			const loanYrToMnths = e * 12;
			this.setState({loanTermsYr: e, loanTermsMnth: loanYrToMnths});
		} else {
			this.setState({loanTermsYr: e});
		}
	}
	
	updateLoanTermsMnth(e) {
		if (this.state.loanTermsYr !== e / 12) {
			const loanMnthsToYrs = e / 12;
			this.setState({loanTermsYr: loanMnthsToYrs, loanTermsMnth: e});
		} else {
			this.setState({loanTermsMnth: e});
		}
	}

	updateInterestRate(e) {
		this.setState({interestRate: e});
	}

  render() {
		const { carPrice, downpayment, loanTermsYr, loanTermsMnth, interestRate } = this.state;
		
    return (
      <div className="auto-loan-calc">
				<header>
					<h1>React - Auto Loan Calculator</h1>
				</header>
				<Calculator
					carPrice = {carPrice}
					downpayment = {downpayment}
					loanTermsYr = {loanTermsYr}
					loanTermsMnth = {loanTermsMnth}
					interestRate = {interestRate}
					calculateMonthlyPayment = {this.calculateMonthlyPayment}
					updateCarPrice = {this.updateCarPrice}
					updateDownpayment = {this.updateDownpayment}
					updateLoanTermsYr = {this.updateLoanTermsYr}
					updateLoanTermsMnth = {this.updateLoanTermsMnth}
					updateInterestRate = {this.updateInterestRate}
				/>
      </div>
    );
  }
}

export default App;
