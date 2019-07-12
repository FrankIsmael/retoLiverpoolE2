import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import './mybulma/css/mystyles.css';
import Search from './components/Search';
import Navbar from './components/Navbar';
import './mybulma/css/mystyles.css';


export default class App extends Component {
  state = {
    products: [],
    history: [],
    searchValue: "",
    flag: false
  }

  getAllProducts = (filter) => {
    axios.get(`https://www.liverpool.com.mx/tienda/?s=${filter}&d3106047a194921c01969dfdec083925=json`)
      .then(responseFromApi => {
        if (!responseFromApi.data.contents) { this.setState({ flag: true }) }
        else { this.setState({ flag: false }) }
        let array = responseFromApi.data.contents[0].mainContent
        var tam = array.length
        this.setState({
          products: responseFromApi.data.contents[0].mainContent[tam - 1].contents[0].records
        })
        if (this.state.products.length === 0) this.setState({ flag: true })
      })
      .catch(err => { return err })
  }

  handleSearch = e => {
    this.setState({ searchValue: e.target.value });
    this.getHistory()
  }

  handleClick = () => {
    this.getAllProducts(this.state.searchValue)
    this.state.history.push(this.state.searchValue)
    this.setHistory(this.state.history)
  }

  getHistory = () => {
    let storedList = localStorage.getItem('history')
    if (storedList == null) {
      this.setState({ history: [] })
    } else {
      this.setState({ history: JSON.parse(storedList) })
    }
    return this.state.history
  }

  setHistory = (list) => {
    localStorage.setItem('history', JSON.stringify(list))
  }

  componentDidMount() {
    this.getHistory()
  }

  render() {
    return (
      <>
        <Navbar />
        <div>
          <Search handleSearch={this.handleSearch} handleClick={this.handleClick} getHistory={this.getHistory} />
          <b>Busquedas:</b>
          {this.state.history.map((search, i) => {
            return (
              <span key={i}> {search} </span>
            )
          })}
        </div>

        <section className="section is-top">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-12">
                <div className="columns is-centered">
                  <div className="column is-two-thirds has-text-centered has-spacing-bottom has-no-background">
                    <h2 className="title is-size-3 is-size-1-tablet">Productos</h2>
                    <div className="subtitle is-size-5 is-size-4-tablet"><p>Productos que coinciden con la búsqueda</p></div>
                  </div>
                </div>
              </div>

              {this.state.products.map((producto, i) => {
                return (
                  <div className="column is-3" key={i}>
                    <div className="card has-equal-height" key={producto._id}>
                      <div className="image-card">
                        <div className="image has-spacing image is-3by2">
                          <img src={producto.thumbnailImage[0]} alt='articulo'/>
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 className="title is-size-4">{producto.productDisplayName[0]}</h3>
                        <h2 className="subtitle">${producto.listPrice[0]}</h2>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </section>
      </>
    )
  }
}