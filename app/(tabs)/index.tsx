import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const {data: trendingMovies, error:trendingErrors, loading:trendingLoading} = useFetch(getTrendingMovies)
  const {data: movies, loading: moviesLoading, error: moviesError } = useFetch(()=> fetchPopularMovies(
    {query: ''}, 
  ))
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {
          moviesLoading || trendingLoading?(
            <ActivityIndicator size={'large'} color={'#0000ff'}  className="mt-10 self-center"/>
          ): moviesError || trendingErrors ? (
            <Text>Error: {moviesError?.message || trendingErrors?.message}</Text>
          ): <View className="flex-1 mt-5">
          <SearchBar 
              placeholder="Search for A Movie"
              onPress={()=>router.push('/search')}
              
          />
          {
            trendingMovies && (
              <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
              </View>
            )
          }
          <>
            

            <FlatList data={trendingMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={()=> <View className="w-4"/>}
              renderItem={({item, index})=>(
                  <TrendingCard movie={item} index={index}/>
              )}
              numColumns={1}
              keyExtractor={item => item.movie_id.toString()}
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            <FlatList 

                data={movies}
                renderItem={({item})=>(
                  <MovieCard 

                    {...item}
                  />
                  
                )}
                keyExtractor={item=>item.id.toString()}          
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'center',
                  gap: 10, 
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 mb-32"
                scrollEnabled={false}
            />
          </>
        </View>
        }
      

      
      </ScrollView>

    <StatusBar barStyle={'light-content'} backgroundColor={'#030014'} />
    </View>
  );
}
