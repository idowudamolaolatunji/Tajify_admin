import React from "react";

function InsightFigure({ insightIcon, insightTitle, insightFigure }) {
	return (
		<div className="insight">
				<span className="insight--icon">{insightIcon}</span>
			<span className="insight--content">
				<p className="insight--title">{insightTitle}</p>
				<span className="insight--number">{insightFigure}</span>
			</span>
		</div>
	);
}

export default InsightFigure;
