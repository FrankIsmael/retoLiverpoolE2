import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import './mybulma/css/mystyles.css';
import Search from './components/Search';
import Navbar from './components/Navbar';
import './mybulma/css/mystyles.css';
import AwesomeComponent from './components/spinner';
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(00px) scale(${s})`

export default class App extends Component {
  state = {
    products: [],
    history: [],
    searchValue: "",
    flag: false,
    loading: true,
    img: false
  }


  Card = () => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    return (
      <animated.div
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      ></animated.div>
    )
  }

  getAllProducts = (filter) => {
    axios.get(`https://www.liverpool.com.mx/tienda/?s=${filter}&d3106047a194921c01969dfdec083925=json`)
      .then(responseFromApi => {
        if (!responseFromApi.data.contents) { this.setState({ flag: true }) }
        else { this.setState({ flag: false }) }
        let array = responseFromApi.data.contents[0].mainContent
        var tam = array.length
        this.setState({
          products: responseFromApi.data.contents[0].mainContent[tam - 1].contents[0].records,
          loading: false, img: 1

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
    this.setState({ loading: true })
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
                <>
                    <span className="button" key={i}>{search}</span>
                </>
              )
            })}
        </div>

        <section className="section is-top">
          <div className="container is-fluid">
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
                    <div className="card" key={producto._id} style={{marginRight:"0", padding:"0"}}>
                      <div className="image-card" style={{padding: "0"}}>
                        <div className="image has-spacing image is-3by2">
                          {
                            this.state.loading ?
                              <div className="column is-centered">
                                <AwesomeComponent />
                              </div>
                              : <img src={producto.
                                smallImage[.0]} alt='articulo' />
                          }
                        </div>
                      </div>
                      <div className="card-content" style={{padding: "0"}}>
                        <h3 className="title is-size-4">{producto.productDisplayName[0]}</h3>
                        <h2 className="subtitle is-size-4 has-text-danger">${producto.listPrice[0]}</h2>
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