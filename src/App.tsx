import React, {useState, useRef} from 'react';
import './App.css';
import { User } from './model';

const App: React.FC = () => {

  const API_URL = "https://api.github.com";

  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] =  useState<User[]>([]);

  const fetchUserData = async (query: string) => {
    try {
      const response = await fetch(`${API_URL}/search/users?q=${query}`)
      const data = await response.json()
      return data.items
    } catch (error) {
      console.log(error);
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  async function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if(query.trim() === ''){
      alert('please enter a search query!')
      return;
    }
    const results = await fetchUserData(query)
    setSearchResults(results)
    setQuery("")
  }
  const inputRef = useRef<HTMLInputElement>(null);
console.log(searchResults)
  return (
    <div className="App">
      <div className="main">
      <h3 className="header">Github User Search</h3>
      <form className="search-form">
        <input className="search-input"
        required={true}
        ref={inputRef}
        value={query}
        type="input"
        placeholder="Enter username or email.."
        onChange={onSearchChange}
        />
        <button onClick={onSearchSubmit} className="search-btn">Search</button>
      </form>
      <>
        <h3 className="results-header">Results</h3>
        <div className="card-container">
        {searchResults && searchResults.map((result) => {
          return <div className="user-card" key={result.id}>
            <div className="card-header">
              <h4>{result.login}</h4>
              <img alt="Github profile" src={result.avatar_url}/>
            </div>
            <a href={result.html_url} target="_blank" rel="noopener noreferrer" className="user-link">Go to profile</a>
          </div>
        })}
        </div>
      </>
      </div>
    </div>
  );
}

export default App;
