import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();
  const {data: movies, loading: moviesLoading, error: moviesError } = useFetch(()=> fetchPopularMovies(
    {query: ''}, 
  ))
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {
          moviesLoading ?(
            <ActivityIndicator size={'large'} color={'#0000ff'}  className="mt-10 self-center"/>
          ): moviesError ? (
            <Text>Error: {moviesError?.message}</Text>
          ): <View className="flex-1 mt-5">
          <SearchBar 
              placeholder="Search for A Movie"
              onPress={()=>router.push('/search')}
          />

          <>
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
