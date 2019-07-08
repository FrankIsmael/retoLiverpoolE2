import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Search from './components/Search';


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
        if(!responseFromApi.data.contents ) {this.setState({flag : true})}
        else{this.setState({flag : false})}
        let array = responseFromApi.data.contents[0].mainContent
        var tam = array.length
        this.setState({
          products: responseFromApi.data.contents[0].mainContent[tam - 1].contents[0].records
        })
        if(this.state.products.length === 0) this.setState({flag : true})
        console.log(this.state.products)
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
    if(storedList == null){
      this.setState({history: []})
    } else{
      this.setState({history: JSON.parse(storedList)})
    }
    return this.state.history
  }

  setHistory = (list) => {
    localStorage.setItem('history', JSON.stringify(list))
  }

  componentDidMount(){
    this.getHistory()
  }

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} handleClick={this.handleClick} getHistory={this.getHistory} />
        <b>Busquedas:</b>
        {this.state.history.map((search,i)=>{
          return(
            <span key={i}> {search} </span>
          )
        })}
        {this.state.flag ?
        <h1>No se obtuvieron resultados, Realize nueva busqueda</h1>
         : 
         <div>
         {this.state.products.map((product, i) => {
           return (
             <div key={i}>
               <img src={product.thumbnailImage[0]} alt='prod' width='100' />
               <h1>{product.productDisplayName[0]}</h1>
               <h1>{product.listPrice[0]}</h1>
             </div>
           )
         })
         }
         </div>}

      </div>
    )
  }
}
