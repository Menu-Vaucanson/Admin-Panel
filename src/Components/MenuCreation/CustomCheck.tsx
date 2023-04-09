function CustomCheck({ type }) {
	if (type === 1) {
		return (
			<div className="check" style={{ backgroundColor: '#50AC75' }}>
				<svg width="2vmax" height="2vmax" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</div>
		);
	} else if (type === 2) {
		return (
			<div className="check" style={{ backgroundColor: '#AC5050' }}>
				<svg width="2vmax" height="2vmax" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="18 6 6 18"></polyline>
					<polyline points="18 18 6 6"></polyline>
				</svg>
			</div>
		);
	} if (type === 3) {
		return (
			<div className="check" style={{ backgroundColor: '#DBAC5B' }}>
				<div className="smallDot"></div>
			</div>
		);
	} else {
		return (
			<div className="check" style={{ backgroundColor: '#505155' }}></div>
		);
	}
}

export default CustomCheck;