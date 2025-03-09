import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'

const search = () => {
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
    </View>
  )
}

export default search

const styles = StyleSheet.create({})