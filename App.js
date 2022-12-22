import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { Nota } from './src/componentes/Nota'

export default function App() {

  const [notes, setNotes] = useState([])

  async function showNotes() {
    const allKeys = await AsyncStorage.getAllKeys()
    const allNotes = await AsyncStorage.multiGet(allKeys)
    setNotes(allNotes)
    console.log(notes)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notes}
        renderItem={(note) => <Nota {...note}/>}
        keyExtractor={note => note[0]}/>
      <NotaEditor showNotes={showNotes}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

