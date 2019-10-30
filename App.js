import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questao: {
        titulo : "Quanto eh 8% de 30?",
        alternativas: ["2", "4", "7", "10", "14"],
        index_correta: 2
      },
      acertou: false,
      index_marcada: null
    }
  }

  marcouAlternativa = (index) => {
    this.setState({
      acertou: index == this.state.questao.index_correta,
      index_marcada: index
    })


  }

 render() {
   return (
    <View style={styles.outside}>
      <View style={styles.container}>
        <View style={styles.footer}>
          <Text>
            &#9719;
          </Text>
          <View style={styles.footerBar}>

          </View>
        </View>
        <Text  style={styles.title}>
          {this.state.questao.titulo}
        </Text>

        {
          this.state.questao.alternativas.map((alternativa, index) => 
            <TouchableOpacity
              onPress={()=>this.marcouAlternativa(index)}
              key={index}
              style={this.state.index_marcada == index ? this.state.acertou?styles.correctOption:styles.wrongOption:styles.option}
              //disabled={this.state.index_marcada != null}
            >
                <Text style={this.state.index_marcada == index ? this.state.acertou?styles.correctOptionText:styles.wrongOptionText:styles.optionText}>
                  {alternativa} {this.state.index_marcada == index ? this.state.acertou?"✓":"✘":""}
                </Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  outside:{
    flex: 1,
    backgroundColor: "rgb(207, 216, 220)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    //padding: 18,
    borderRadius: 10,    
    width: "96%",
    height: "96%"
  },
  footer:{
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 15,
    justifyContent: "center",
    flexDirection: 'row',
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 2,
    alignItems: "center"
  },
  footerBar:{
    marginLeft: 5,
    width: 240,
    height: 12,
    borderRadius: 20,
    backgroundColor: "red",
  },
  title:{ 
    textAlign: "center",
    margin: 12,
    padding: 1.5,
    fontSize: 18
  },
  option:{
    borderRadius: 290486,
    padding: 10,
    paddingLeft: 15,
    margin: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  correctOption :{
    borderRadius: 290486,
    padding: 10,
    paddingLeft: 15,
    margin: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: "rgb(0, 204, 153)",
  },
  wrongOption :{
    borderRadius: 290486,
    padding: 10,
    paddingLeft: 15,
    margin: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
    backgroundColor: "rgb(230,110,94)",
  },
  optionText:{
    color: "rgba(0, 0, 0, 0.85)"
  },
  correctOptionText:{
    color: "rgba(250, 250, 250, 0.85)",
    fontWeight: "bold"
  },
  wrongOptionText:{
    color: "rgba(250, 250, 250, 0.85)",
    fontWeight: "bold"
  }
})
