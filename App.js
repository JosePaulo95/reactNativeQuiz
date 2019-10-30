import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ProgressBarAndroid,
  Alert
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
      pontos: 0,
      acertou: false,
      index_marcada: null,
      tempo_restante: 15,
      tempo_maximo: 15,
      bonus_tempo: 7,
      ref_timer: null
    }
  }
  componentDidMount(){
    this.gerarQuestao();
  }

  decrementaTempo(){
    this.setState({
      tempo_restante: Math.max(this.state.tempo_restante-1, 0)
    })

    if(this.state.tempo_restante==0){
      clearInterval(this.state.ref_timer);
      this.gameOver("Sem tempo!");
    }
  }
  gameOver(causa_str){
    const ptos_str = this.state.pontos == 1?"ponto":"pontos"; 

    Alert.alert(
      causa_str,
      "A alternativa correta era "+this.state.questao.alternativas[this.state.questao.index_correta]+"."+
      "\nVocê fez "+this.state.pontos+" "+ptos_str+".\n",
      [
        {text: 'Recomeçar', onPress: () => {
          this.iniciar();
        }},
      ],
      {cancelable: false},
    );

    //alert("Que pena! A alternativa correta era "+this.state.questao.alternativas[this.state.questao.index_correta]);
  }
  iniciar(){
    this.setState({
      pontos: 0,
      tempo_restante: this.state.tempo_maximo,
      index_marcada: null,
    })
    this.resetarNovaQuestao();
  }
  aplicaBonusTempo(){
    this.setState({
      tempo_restante: Math.min(this.state.tempo_maximo,this.state.tempo_restante+this.state.bonus_tempo)
    });
  }
  resetarNovaQuestao(){
    this.gerarQuestao();
    this.setState({
      acertou: false,
      index_marcada: null
    })
  }
  marcouAlternativa = (index) => {
    const acertou = index == this.state.questao.index_correta;

    this.setState({
      acertou: acertou,
      index_marcada: index
    })

    if(acertou){
      if(this.state.pontos == 0){
        let ref_timer = setInterval(() => {
          this.decrementaTempo();
        }, 1000);

        this.setState({
          ref_timer: ref_timer
        })
      }
      this.setState({
        pontos: this.state.pontos+1
      });
      this.aplicaBonusTempo();
      setTimeout(() => {
        this.resetarNovaQuestao();
      }, 400)
    }else{
      clearInterval(this.state.ref_timer);
      setTimeout(() => {
        this.gameOver(":(");
      }, 700)
    }

  }

 render() {
   return (
    <View style={styles.outside}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>
            &#9719;
          </Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={this.state.tempo_restante/this.state.tempo_maximo}
            style={this.state.tempo_restante/this.state.tempo_maximo<=0.3?styles.RedTimerBar:styles.GreenTimerBar}
          />

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
              disabled={this.state.index_marcada != null}
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
      [8,[50,80,200]],
      [20, [15,25,40,45,50,55,65,70,75,80,90,200]],
      [25, [16,20,24,32,36,40,44,48,60,80,200]],
      [30, [30,40,50,70,80,200]],
      [40, [20,50,70,80,90,200]],
      [60, [20,30,40,50,90,200]],
      [70, [50,200]],
      [75, [16,20,40,80,200]],
      [80, [15,20,25,40,45,50,55,70,80,90,200]],
      [90, [5,15,20,25,30,35,40,45,50,55,60,65,70]]
    ]

    var enunciado;
    var respostas = Array();

    var index_par = this.getRandomIntInclusive(0,pares_questoes.length-1);
    var index_b = this.getRandomIntInclusive(0, pares_questoes[index_par][1].length-1);

    var a = pares_questoes[index_par][0];
    var b = pares_questoes[index_par][1][index_b];

    var erros = a>=25&&b>=80?5:1;

    enunciado = "Quanto é "+a+"% de "+b+"?";

    var resposta_correta = a/100*b;
    respostas.push(resposta_correta);
    respostas.push(resposta_correta-erros);
    respostas.push(resposta_correta-erros*2);
    respostas.push(resposta_correta+erros);
    respostas.push(resposta_correta+erros*2);

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
  header:{
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 15,
    justifyContent: "center",
    flexDirection: 'row',
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 2,
    alignItems: "center"
  },
  RedTimerBar:{
    marginLeft: 5,
    flex:1,
    color: "red"
  },
  GreenTimerBar:{
    marginLeft: 5,
    flex:1,
    color: "green"
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
