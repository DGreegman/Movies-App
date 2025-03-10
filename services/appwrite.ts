// track the searches made by a user 
import {Client, Databases, ID, Query} from 'react-native-appwrite'
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!

console.log(PROJECT_ID, COLLECTION_ID, DATABASE_ID);


const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PROJECT_ID)


const database = new Databases(client)



export const updateSearchCount =  async(query: string, movie:Movie) => {

   try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ])
    
    
    
    // check if the record of that search has already been stored

    if(result.documents.length > 0){
        const existingMovie = result.documents[0]
        
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
            count: existingMovie.count + 1,
        })
    }else{
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            count: 1,
            title: movie.title,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        })
    }
    // if a document is been found, then increment the count field 

    // if no document is been found 
        // create a document in the apprwrite database and initialize count to 1
   } catch (error) {
        console.log(error);
        throw error
        
   }
}

export const getTrendingMovies = async() : Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result.documents as unknown as TrendingMovie[]
    } catch (error) {
        console.log(error);
        throw error
        
        
    }
}