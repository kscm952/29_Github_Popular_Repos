import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    isLoading: false,
    apiStatus: apiStatusConstants.initial,
    activeLanguageId: 'ALL',
  }

  componentDidMount() {
    this.getReposList()
  }

  setActiveLanguage = id => {
    this.setState({activeLanguageId: id}, this.getReposList)
  }

  getReposList = async () => {
    this.setState({isLoading: true})
    const {activeLanguageId} = this.state

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(githubReposApiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.popular_repos)
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure, isLoading: false})
    }
  }

  renderReposList = () => {
    const {reposList} = this.state

    return (
      <>
        <ul className="repos-list">
          {reposList.map(eachRepo => (
            <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderPopularReposList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReposList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isLoading, activeLanguageId} = this.state

    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="app-heading">Popular</h1>
          <ul className="languages-list">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                languageDetails={eachLanguage}
                setActiveLanguage={this.setActiveLanguage}
                isActive={activeLanguageId === eachLanguage.id}
              />
            ))}
          </ul>
          {isLoading ? this.renderLoader() : this.renderPopularReposList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
