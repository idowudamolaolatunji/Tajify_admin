import React from "react";

function InsightFigure({ insightIcon, insightTitle, insightFigure }) {
	return (
		<div className="insight">
			<span className="insight--content">
				<span className="insight--icon">{insightIcon}</span>
				<p className="insight--title">{insightTitle}</p>
			</span>
			<span className="insight--number">{insightFigure}</span>
		</div>
	);
}

export default InsightFigure;
