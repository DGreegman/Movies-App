import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string
    onPress?: () => void
}
const SearchBar:React.FC<Props> = ({placeholder, onPress}) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={'#ab8bff'}/>

      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
     // Adjust this value as needed
  >
    
      <TextInput onPress={onPress} 
            placeholder={placeholder}
            value=''
            onChangeText={()=>{}}
            placeholderTextColor={'#ab8bff'}
            className='flex-1 ml-2 text-white'
        />
  </KeyboardAvoidingView>

    </View>
  )
}

export default SearchBar
