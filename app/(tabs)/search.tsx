import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { fetchPopularMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const search = () => {
  const [search, setSearch] = useState('')
  const {data: movies, loading: moviesLoading, error: moviesError, refetch:loadMovies, reset  } = useFetch(()=> fetchPopularMovies(
    {query: search}, 
  ), false)
  
  
  useEffect(()=>{
    // the timeout here is used to prevent more request on each stroke when searching 
    const timeId = setTimeout(async () => {
      if(search.trim()){

        await loadMovies()
        if(movies?.length > 0 && movies?.[0])
          await updateSearchCount(search, movies[0])
       }else{
         reset()
       }
    }, 500)

    return () => clearTimeout(timeId)
  }, [search])

  
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList 

          data={movies}
          renderItem={({item})=>(
            <MovieCard 

              {...item}
            />
            
          )}
          keyExtractor={item=>item.id.toString()}          
          numColumns={3}
          className='px-5'
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16, 
            marginVertical: 16
          }}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View className='w-full flex-row justify-center mt-20'>

                <Image source={icons.logo} className='w-12 h-10'/>

              </View>

              <View className='my-5'>
                  <SearchBar 
                      placeholder="Search Movies..."
                      value={search}
                      onChangeText={(text:string)=>setSearch(text)}
                  />
              </View>

              {
                moviesLoading && (
                  <ActivityIndicator size={'large'} color={'#0000ff'}  className="my-3" />
                )
              }

              {
                moviesError && (
                  <Text className='text-red-500 px-5 my-3'>Error: {moviesError?.message}</Text>
                )
              }

              {
                !moviesLoading && !moviesError && search.trim() && movies?.length > 0 && (
                  <Text className='text-xl text-white font-bold'>
                    Search Results for {' '}
                    <Text className='text-accent'>{search}</Text>
                  </Text>
                )
              }
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                    { search.trim() ? 'No Movies Found' : 'Search for a Movie' }
                </Text>
              </View>
            ): null
          }
      />
    </View>
  )
}

export default search
