import React from 'react';
import Amortization from './Amortization';

class Calculator extends React.Component {

	render () {
		const { carPrice, downpayment, loanTermsYr, loanTermsMnth, interestRate, calculateMonthlyPayment, updateCarPrice, updateDownpayment, updateLoanTermsYr, updateLoanTermsMnth, updateInterestRate } = this.props;
		const loan = calculateMonthlyPayment(carPrice, downpayment, loanTermsYr, loanTermsMnth, interestRate);
		const monthlyPayment = loan.monthlyPayment;
		const amortization = loan.amortization;
		
		return (
			<div className="calculator-wrapper">
				<form action="" className="calculator">
					<div className="car-price">
						<label>Car Price:</label>
						<input type="text" value={carPrice} onChange={e => updateCarPrice(e.target.value)}/>
					</div>
					<div className="downpayment">
						<label>Downpayment:</label>
						<input type="text" value={downpayment} onChange={e => updateDownpayment(e.target.value)}/>
					</div>
					<div className="loan-terms-yr">
						<label>Loan Duration (Yearly):</label>
						<input type="text" value={loanTermsYr} onChange={e => updateLoanTermsYr(e.target.value)}/>
					</div>
					<div className="loan-terms-mnth">
						<label>Loan Duration (Monthly):</label>
						<input type="text" value={loanTermsMnth} onChange={e => updateLoanTermsMnth(e.target.value)}/>
					</div>
					<div className="interest-rate">
						<label>Interest Rate %:</label>
						<input type="text" value={interestRate} onChange={e => updateInterestRate(e.target.value)}/>
					</div>
				</form>
				<h4>Monthly Payment:<span>{Number(monthlyPayment.toFixed(2)).toString()}</span></h4>
				<Amortization
					amortization = {amortization}
				/>
			</div>
		)
	}
}

export default Calculator;
