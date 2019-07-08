import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Search from './components/Search';


export default class App extends Component {
  state = { products: [],
    filter: ''
  }

  getAllProducts = (filter) => {
    axios.get(`https://www.liverpool.com.mx/tienda/?s=${filter}&d3106047a194921c01969dfdec083925=json`)
      .then(responseFromApi => {
        let array = responseFromApi.data.contents[0].mainContent
        var tam = array.length
        this.setState({
          products: responseFromApi.data.contents[0].mainContent[tam - 1].contents[0].records
        })
        console.log(this.state.products)
      })
      .catch(err => { return err })
  }
  
  handleSearch = e => {
    //this.setState({filter: e.target.value})
    const searchTerm = e.target.value
    this.getAllProducts(searchTerm);
  }

  //componentDidMount() {
    
  //}

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch}/>
        <div>{this.state.filter}</div>
        

        {this.state.products.map((product,i) => {
                        return (
                            <div key={i}>
                                    <img src={product.thumbnailImage[0]} alt='prod' width='100' />
                                    <h1>{product.productDisplayName[0]}</h1>
                                    <h1>{product.listPrice[0]}</h1>
                            </div>
                        )
                    })
                    }
      </div>
    )
  }
}
