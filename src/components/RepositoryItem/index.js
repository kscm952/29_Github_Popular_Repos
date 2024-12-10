// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} className="repo-icon" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="repo">
        <div className="repo-data">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="repo-details">{starsCount} stars</p>
        </div>
        <div className="repo-data">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="repo-details">{forksCount} forks</p>
        </div>
        <div className="repo-data">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="repo-details">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
