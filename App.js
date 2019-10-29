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
    this.state = { sucesso: true }
  }

  onPress = () => {
    this.setState({
      sucesso: Math.floor(Math.random()*10)>5
    })
  }

 render() {
   return (
    <View style={styles.outside}>
      <View style={styles.container}>
        <Text  style={styles.title}>
          Quanto eh 1+1?
        </Text>

        <TouchableOpacity style={styles.option}>
            <Text>
              a. saksas aaksal 
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
            <Text>
              a. saksas aaksal 
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
            <Text>
              a. saksas aaksal 
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
            <Text>
              a. saksas aaksal 
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
            <Text>
              a. saksas aaksal 
            </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.footerBar}>

          </View>
          <Text style={styles.footerText}>
            16 questoes respondidas
          </Text>
        </View>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  outside:{
    flex: 1,
    backgroundColor: "#008983",
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
    flexDirection: 'column',
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 2,
    alignItems: "center"
  },
  footerBar:{
    width: 170,
    height: 20,
    margin: 8,
    borderRadius: 20,
    backgroundColor: "red",
  },
  footerText:{
    
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
    color: "rgba(0, 0, 0, 0.85)"
  }
})
