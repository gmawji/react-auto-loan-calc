import React from 'react';

class Amortization extends React.Component {
	render() {
		const { amortization } = this.props;
		let table = this.props.amortization.map(function (amortization, index) {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{Number(amortization.amountPaid.toFixed(2)).toLocaleString()}</td>
					<td>{Number(amortization.interest.toFixed(2)).toLocaleString()}</td>
					<td>{Number(amortization.balance.toFixed(2)).toLocaleString()}</td>
				</tr>
			)
		});

		return (
			<table>
				<thead>
					<tr>
						<th>Month</th>
						<th>Amount Paid</th>
						<th>Interest Paid</th>
						<th>Remaining Balance</th>
					</tr>
				</thead>
				<tbody>{table}</tbody>
			</table>
		)
	}
}

export default Amortization;
