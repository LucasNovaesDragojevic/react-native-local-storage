import { useEffect, useState } from 'react'
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from './src/componentes/Nota'
import { createTable, getAllNotes, getAllNotesWithLabel } from "./src/services/Notes"
import { Picker } from '@react-native-picker/picker'

export default function App() {

  useEffect(createTable, [])
  useEffect(showNotes, setLabelFilter)

  const [notes, setNotes] = useState([])
  const [noteSelected, setNoteSelected] = useState({})
  const [labelFilter, setLabelFilter] = useState('All')

  async function showNotes() {
    let notesFinded
    if (labelFilter == 'All')
      notesFinded = await getAllNotes()
    else 
      notesFinded = await getAllNotesWithLabel(labelFilter)
    setNotes(notesFinded)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.modalPicker}>
        <Picker selectedValue={labelFilter}
          onValueChange={setLabelFilter}>
          <Picker.Item label='All' value={'All'}/>
          <Picker.Item label='Default' value={'Default'}/>
          <Picker.Item label='Work' value={'Work'}/>
          <Picker.Item label='Other' value={'Other'}/>
        </Picker>
      </View>
      <FlatList
        data={notes}
        renderItem={(note) => <Nota {...note} setNoteSelected={setNoteSelected}/>}
        keyExtractor={note => note.id}/>
      <NotaEditor showNotes={showNotes} noteSelected={noteSelected} setNoteSelected={setNoteSelected}/>
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
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 8
  }
})

