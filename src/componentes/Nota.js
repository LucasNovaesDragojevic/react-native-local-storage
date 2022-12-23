import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export function Nota({item, setNoteSelected}) {
  const categorias = {Default: "#FF924F", Other: "#00911F", Work: "#2F71EB"}
  const style = styleFunction(categorias[item.label])
  
  return (
    <TouchableOpacity style={style.cartao}
      onPress={() => setNoteSelected(item)}>
      <Text style={style.titulo}>{item.title}</Text>
      <Text style={style.categoria}>{item.label}</Text>
      <Text style={style.texto} numberOfLines={5}>{item.content}</Text>
    </TouchableOpacity>
  )
}

const styleFunction = (cor) => StyleSheet.create({
  cartao: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderTopWidth: 5,
    borderColor: cor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  categoria: {
    borderRadius: 4,
    backgroundColor: cor,
    padding: 4,
    color: "#FAFAFA",
    alignSelf: "flex-start",
  },
  texto: {
    lineHeight: 28,
  }
})
