// Write your code here
import './index.css'

const LanuageFilterItem = props => {
  const {languageDetails, setActiveLanguage, isActive} = props
  const {id, language} = languageDetails

  const activeBtnClassName = isActive ? 'btn active' : 'btn'

  const onClickLanguage = () => {
    setActiveLanguage(id)
  }

  return (
    <li className="language-item">
      <button
        className={activeBtnClassName}
        type="button"
        onClick={onClickLanguage}
      >
        <span className="language">{language}</span>
      </button>
    </li>
  )
}

export default LanuageFilterItem
