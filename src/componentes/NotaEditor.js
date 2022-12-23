import React, { useEffect, useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { addNote, deleteNote, updateNote } from '../services/Notes'

export default function NotaEditor({showNotes, noteSelected, setNoteSelected}) {

  useEffect(() => {
    if (noteSelected.id) {
      fillModal()
      setNoteForUpdate(true)
      setModalVisivel(true)
      return
    }
    setNoteForUpdate(false)
  }, [noteSelected])

  const [title, setTitle] = useState('')
  const [label, setLabel] = useState('Default')
  const [content, setContent] = useState('')
  const [modalVisivel, setModalVisivel] = useState(false)
  const [noteForUpdate, setNoteForUpdate] = useState(false)

  function cleanModal() {
    setTitle('')
    setLabel('Default')
    setContent('')
    setNoteSelected({})
    setModalVisivel(false)
  }

  async function saveNote() {
    const note = {
      title: title,
      label: label,
      content: content
    }
    await addNote(note)
    showNotes()
    cleanModal()
  }

  async function modifyNote() {
    const note = {
      title: title,
      label: label,
      content: content,
      id: noteSelected.id
    }
    await updateNote(note)
    showNotes()
    cleanModal()
  }

  function fillModal() {
    setTitle(noteSelected.title)
    setLabel(noteSelected.label)
    setContent(noteSelected.content)
  }

  async function removeNote() {
    await deleteNote(noteSelected)
    showNotes()
    cleanModal()
  }

    return(
    <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivel}
          onRequestClose={() => {setModalVisivel(false)}}>
          <View style={estilos.centralizaModal}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Create note</Text>
              <Text style={estilos.modalSubTitulo}>Title of note</Text>
              <TextInput style={estilos.modalInput}
                onChangeText={newTitle => setTitle(newTitle)}
                placeholder="Write here your title"
                value={title}/>
                <Text style={estilos.modalSubTitulo}>Label</Text>
                <View style={estilos.modalPicker}>
                  <Picker
                    selectedValue={label}
                    onValueChange={newLabel => setLabel(newLabel)}>
                    <Picker.Item label='Default' value={'Default'}/>
                    <Picker.Item label='Work' value={'Work'}/>
                    <Picker.Item label='Other' value={'Other'}/>
                  </Picker>
                </View>
                <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
                <TextInput
                  style={estilos.modalInput}
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={novoTexto => setContent(novoTexto)}
                  placeholder="Digite aqui seu lembrete"
                  value={content}/>
                <View style={estilos.modalBotoes}>
                  <TouchableOpacity style={estilos.modalBotaoSalvar} 
                    onPress={() => noteForUpdate ? modifyNote() : saveNote()}>                    
                    <Text style={estilos.modalBotaoTexto}>Save</Text>
                  </TouchableOpacity>
                  { noteForUpdate ? 
                    <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {removeNote()}}>
                        <Text style={estilos.modalBotaoTexto}>Delete</Text>
                    </TouchableOpacity> : <></>
                  }
                  <TouchableOpacity style={estilos.modalBotaoCancelar} 
                    onPress={cleanModal}>
                    <Text style={estilos.modalBotaoTexto}>Cancel</Text>
                  </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
        </Modal>
        <TouchableOpacity onPress={() => {setModalVisivel(true)}} style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
        </TouchableOpacity>
    </>
    )
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  modal: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#FF9A94",
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600"
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBotaoSalvar: {
    backgroundColor: "#2ea805",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoDeletar: {
    backgroundColor: "#d62a18",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoCancelar: {
    backgroundColor: "#057fa8",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#FFFFFF",
  },
  adicionarMemo: {
    backgroundColor: "#54ba32",
    justifyContent: "center",
    height: 64,
    width: 64,
    margin: 16,
    alignItems: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  adicionarMemoTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: "#FFFFFF",
  }
});
