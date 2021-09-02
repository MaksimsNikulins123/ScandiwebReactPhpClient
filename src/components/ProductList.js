import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from  'react-router-dom';
import Products from "./Products";
import axios from "axios";

class ProductList extends Component
{
  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      products: []
    };
  }

  componentDidMount(){
    fetch("https://scandiwebreactphpmysqlserver.herokuapp.com/")
    .then(response => response.json())
    .then(response => {
      this.setState({ products: response });
    })
    .catch(function(error){
      console.log(error);
      })
      
  }
  
  
  productList(){
    return this.state.products.map(
      function(object, i){
      return <Products obj={object} key={i}/>;
      }
    );
  }
  
  delete(){ 
    let clickBtnValue = document.getElementById('delete').name;
    const array = []
    let checkboxes = document.querySelectorAll('.delete-checkbox:checked')
    for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value)
    }
    fetch("https://scandiwebreactphpmysqlserver.herokuapp.com/", {   
      method: "POST",
      body: JSON.stringify({
              clickBtnValue: clickBtnValue,
              deleteId: array
            }),
     
      }).then(function(response) {
        return response.text();
      }).then(function() {
          window.location.href = '/';
      });
  }


  render()
  {
    return(
        <div>
          <div className="container">
          <header>
            <div className="header d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <div className="header_title navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">Product List</div>
                    <div className="header_buttons nav nav-pills">
                        <div className="header_button  me-2">
                            <Link to={'/addproduct'} className="btn btn-success">ADD</Link>
                        </div>
                        <div className="header_button me-2">
                        <input type="button" value="MASS DELETE" className="btn btn-success" name="delete" onClick={this.delete} id="delete"/>
                     
                        </div>
                    </div>
            </div>
        </header>  
      
          <section>
            <div className="container">
              <div className="row">
                {this.productList()}
              </div>
            </div>
            
          </section>
          
            <footer>
                <div className="footer d-flex flex-wrap justify-content-center py-3 mb-4 border-top">
                    <div className="footer_title">
                        <p>Scandiweb Test assigment</p>
                    </div>
                </div>
            </footer>
          </div>
          
        </div>
    );
  }
}
export default ProductList
