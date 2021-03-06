import React from 'react'
import Head from '../components/head'
import Header from '../components/header'
import Tarjeta from '../components/tarjeta'
import Footer from '../components/footer'
import axios from 'axios'



export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }

    axios.get('https://contador-de-votos.now.sh/')
    .then(response => {
      console.log("Recuperando datos..")
      this.setState( 
        { votos:
          [
            {
                "titulo": "A favor",
                "votos": response.data.aFavor,
                "color": "tarjeta-afavor"
            },
            { 
                "titulo": "En contra",
                "votos": response.data.enContra,
                "color": "tarjeta-encontra"
            },
            {
                "titulo": "No confirmados",
                "votos": response.data.noConfirmado,
                "color": "tarjeta-noconfirmados"
            },
            {
                "titulo": "Se abstienen",
                "votos": response.data.seAbstiene,
                "color": "tarjeta-abstenciones"
            }
        ]
      })
    })
  }

  render() {

    return (
      <div className='container'>
            <Head/>
            <Header />
            {
              this.state.votos &&
              <div className="fila">
                <Tarjeta posicion={this.state.votos[0]}/>
                <div className="divisor"></div>
                <Tarjeta posicion={this.state.votos[1]}/>
                <div className="divisor"></div>
                <Tarjeta posicion={this.state.votos[2]}/>
                <div className="divisor"></div>
                <Tarjeta posicion={this.state.votos[3]}/>
              </div>
            }
            <Footer />

            <style jsx>{`
              .container {
                height: 100vh;
                display: flex;
                flex-wrap: wrap;
                align-items: space-between;
                justify-content: center;
              }
              .fila {
                margin: auto;
                width: 90%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-start;
                margin-top: 20px;
                margin-bottom: 35px;
              }
              @media (max-width: 767px) {
                .fila {
                  display: block;
                }
              }
              .divisor {
                width:100%;
              }
            `}</style>
        </div>
    )
  }
}
