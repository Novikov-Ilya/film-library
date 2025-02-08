import './searchPanel.scss'

export default function SearchPanel() {
  return (
    <div className="search-panel">
      <input type="text" id='quick-search' />
      <button className='search-button'>Search</button>
    </div>
  )
}