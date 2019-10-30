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
        titulo : "",
        alternativas: [],
        index_correta: null
      },
      acertou: false,
      index_marcada: null
    }
  }
  componentDidMount(){
    this.gerarQuestao();
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

  gerarQuestao(){
    const pares_questoes = [
      [5,[50,70,80,200]],
      [8,[40,50,80,200]],
      [20, [15,25,40,45,50,55,65,70,75,80,90,200]],
      [25, [16,20,24,32,36,40,44,48,60,80,200]],
      [30, [30,40,50,70,80,200]],
      [40, [20,50,70,80,90,200]],
      [60, [20,30,40,50,90,200]],
      [70, [50,90,200]],
      [75, [16,20,24,32,36,40,80,200]],
      [80, [15,20,25,40,45,50,55,70,80,90,200]],
      [90, [5,15,20,25,30,35,40,45,50,55,60,65,70]]
    ]

    var enunciado;
    var respostas = Array();

    var index_par = this.getRandomIntInclusive(0,pares_questoes.length-1);
    var index_b = this.getRandomIntInclusive(0, pares_questoes[index_par][1].length-1);

    var a = pares_questoes[index_par][0];
    var b = pares_questoes[index_par][1][index_b];

    enunciado = "Quanto é "+a+"% de "+b+"?";

    var resposta_correta = a/100*b;
    respostas.push(resposta_correta);
    respostas.push(resposta_correta-1);
    respostas.push(resposta_correta-2);
    respostas.push(resposta_correta+1);
    respostas.push(resposta_correta+2);

    respostas = this.shuffleArray(respostas);
    
    var index_correta = respostas.indexOf(resposta_correta);

    this.setState({
      questao: {
        titulo: enunciado,
        alternativas: respostas,
        index_correta: index_correta
      }
    })
  }

  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;      ;
  }
  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
