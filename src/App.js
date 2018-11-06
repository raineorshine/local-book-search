import React, { Component } from 'react';
import './App.css';

const SEARCH_TOKEN = '__SEARCH__'
let windowCounter = 0

const bookSellers = [
  {
    name: 'City Stacks',
    search: 'https://www.citystacks.com/search/site/__SEARCH__'
  },
  {
    name: 'Tattered Cover',
    search: 'https://www.tatteredcover.com/search/site/__SEARCH__'
  },
  {
    name: 'Boulder Bookstore',
    search: 'https://www.boulderbookstore.net/search/site/__SEARCH__'
  },
  {
    name: 'Better World Books',
    search: 'https://www.betterworldbooks.com/search/results?q=__SEARCH__'
  },
  {
    name: 'Half Price Books',
    search: 'https://www.hpb.com/products?language=&year_from=&year_to=&utf8=%E2%9C%93&keywords=__SEARCH__&catalog_type=book&sort_by=most_relevant'
  },
  {
    name: 'Biblio',
    search: 'https://www.biblio.com/search.php?stage=1&author=&title=&desc=__SEARCH__&publisher='
  }
]

const searchUrl = (seller, search) =>
  seller.search.replace(SEARCH_TOKEN, window.encodeURIComponent(search))

const sellerLink = (seller, search) =>
  <a key={seller.name} target='_blank' rel='noopener noreferrer' href={searchUrl(seller, search)}>{seller.name}</a>

const searchAll = search => {
  // local only
  bookSellers.slice(0, 3).forEach(seller =>
    window.open(searchUrl(seller, search), windowCounter++)
  )
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  render() {

    // bind search to sellerLink
    const sellerLinkWithSearch = seller => sellerLink(seller, this.state.search)

    return (
      <div className='App'>
        <div className='App-header'>
          <input type='text' autoFocus placeholder='Search bookstores' value={this.state.search} onChange={e => this.setState({ search: e.target.value })} onKeyDown={e => e.key === 'Enter' ? searchAll(this.state.search) : null} />
          <p className='helper-text'>Hit Enter to open windows for local bookstores.</p>
          <div className='list'>
            {bookSellers.map(sellerLinkWithSearch)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
