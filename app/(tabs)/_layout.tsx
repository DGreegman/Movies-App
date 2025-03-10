import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({focused, icon, title}:any) => {
     {
        return focused ?  (
        <ImageBackground source={images.highlight} className='flex flex-row w-[90%] min-w-[100px] min-h-16 mt-4 ml-2 mr-2 justify-center items-center rounded-full overflow-hidden'>
    <Image source={icon} tintColor={'#151312'} className='size-5'/>
    <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
</ImageBackground>
    ): <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon}  tintColor={"#A8B5DB"} className='size-5'/>
    </View>
    }
    
}
const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },

            tabBarHideOnKeyboard: true,
            
            
            tabBarStyle: {
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 20,
                height: 52,
                position: 'absolute',
                bottom: -15, 
                left: 0,    
                right: 0,   
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0f0D23',
                
            }
        }}
    >
        <Tabs.Screen name='index' 
        options={{
            headerShown: false, 
            title: 'Home',
            tabBarIcon: ({focused}) => (
                <TabIcon 
                    focused={focused}
                    icon={icons.home}
                    title="Home"
                />
            )
        
        }} 
        
            
        />
        <Tabs.Screen name='search' 
        options={{
            headerShown: false, 
            title: 'Search',
            tabBarIcon: ({focused}) => (
                <TabIcon 
                focused={focused}
                icon={icons.search}
                title="Saved"
            />
            )
        }} />

        <Tabs.Screen name='saved' 
        options={{
            headerShown: false, 
            title: 'Saved',
            tabBarIcon: ({focused}) => (
                <TabIcon 
                focused={focused}
                icon={icons.save}
                title="Saved"
            />
            )
            }} />
        
        <Tabs.Screen name='profile' 
        options={{
            headerShown: false, 
            title: 'Profile',
            tabBarIcon: ({focused}) => (
                <TabIcon 
                focused={focused}
                icon={icons.person}
                title="Profile"
            />
            )
            
            }} />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})