import './Results.css'

function Results({ data, onReset }) {
  const {
    overall_score = 0,
    skill_score = 0,
    gap_analysis = [],
    suggestions = [],
  } = data

  const matchedSkills = gap_analysis.filter(
    (skill) => skill.in_resume && skill.required
  ).length
  const missingSkills = gap_analysis.filter(
    (skill) => !skill.in_resume && skill.required
  ).length
  const bonusSkills = gap_analysis.filter(
    (skill) => skill.in_resume && !skill.required
  ).length

  const getSkillBadge = (skill) => {
    if (skill.in_resume && skill.required) {
      return { class: 'badge-matched', text: 'Matched', icon: '✓' }
    } else if (!skill.in_resume && skill.required) {
      return { class: 'badge-missing', text: 'Missing', icon: '✗' }
    } else if (skill.in_resume && !skill.required) {
      return { class: 'badge-bonus', text: 'Bonus', icon: '+' }
    }
    return { class: 'badge-neutral', text: 'Neutral', icon: '○' }
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <button className="reset-button" onClick={onReset}>
          ← Start Over
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <div className="metric-label">Overall Score</div>
            <div className="metric-value">{overall_score}%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💻</div>
          <div className="metric-content">
            <div className="metric-label">Skill Score</div>
            <div className="metric-value">{skill_score}%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✓</div>
          <div className="metric-content">
            <div className="metric-label">Matched Skills</div>
            <div className="metric-value">{matchedSkills}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <div className="metric-label">Missing Skills</div>
            <div className="metric-value">{missingSkills}</div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Overall Match</span>
            <span className="progress-value">{overall_score}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${overall_score}%` }}
            ></div>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Technical Skills Match</span>
            <span className="progress-value">{skill_score}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${skill_score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Gap Analysis */}
      {gap_analysis.length > 0 && (
        <div className="gap-analysis-section">
          <h3>Skill Gap Analysis</h3>
          <div className="table-wrapper">
            <table className="gap-table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">In Resume</th>
                  <th className="text-center">Required</th>
                </tr>
              </thead>
              <tbody>
                {gap_analysis.map((skill, idx) => {
                  const badge = getSkillBadge(skill)
                  return (
                    <tr key={idx}>
                      <td className="skill-name">{skill.skill}</td>
                      <td className="text-center">
                        <span className={`badge ${badge.class}`}>
                          {badge.icon} {badge.text}
                        </span>
                      </td>
                      <td className="text-center">
                        {skill.in_resume ? '✓' : '✗'}
                      </td>
                      <td className="text-center">
                        {skill.required ? '✓' : '✗'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions-section">
          <h3>Resume Suggestions</h3>
          <div className="suggestions-list">
            {suggestions.map((suggestion, idx) => (
              <div className="suggestion-card" key={idx}>
                <div className="suggestion-header">
                  <div className="suggestion-number">{idx + 1}</div>
                  <div className="suggestion-original">
                    <strong>Original:</strong> {suggestion.original}
                  </div>
                </div>
                <div className="rewrites">
                  <div className="rewrites-label">Suggested Rewrites</div>
                  <ul className="rewrites-list">
                    {suggestion.rewrites &&
                      suggestion.rewrites.map((rewrite, rewriteIdx) => (
                        <li key={rewriteIdx}>{rewrite}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="results-footer">
        <button className="reset-button-large" onClick={onReset}>
          Analyze Another Resume
        </button>
      </div>
    </div>
  )
}

export default Results
