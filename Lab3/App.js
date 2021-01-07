import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Component} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet,AsyncStorage, Picker, ActivityIndicator} from 'react-native';
import { ApolloClient,InMemoryCache, ApolloProvider, Query, HttpLink, ApolloLink } from '@apollo/client';
import { gql, useQuery} from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GITHUB_TOKEN } from "@env";



const Stack = createStackNavigator();


const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: 'Bearer d49c039d7b31293023e3748da26400300b1b790d'
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache : new InMemoryCache(),

});


const GITHUB_DATA = gql`
query($query: String!) {
  search(first: 10, type: REPOSITORY, query: $query) {
      edges {
        node {
          ... on Repository {
            name
            url
            forkCount
            description
            stargazers(orderBy:{field:STARRED_AT,direction:DESC }) {
              totalCount
            }
            defaultBranchRef{
              target{
                ... on Commit{
                  history(first:10){
                    totalCount
                  }
                }
              }
            }
            owner{
              login
            }
            createdAt
            url
          }
        }
      }
  }
}
`;

const App = () =>  {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
           <Stack.Screen name="Trending Repositories" component={Main} />
           <Stack.Screen name="Details" component={DetailedRepo} />
           </Stack.Navigator>
         </NavigationContainer>
      </ApolloProvider>
    );
}

const DetailedRepo = ({ navigation, route }) =>{


  return (
    <SafeAreaView style={styles.detailedView}>
      <View style={styles.detailedHeader}>
        <Text style={styles.headerText}>{route.params.d.node.name}</Text>
      </View>
      <View style={styles.detailedDescription}>
        <Text style={styles.detailedtext}>{route.params.d.node.description} </Text>
      </View>
      <View style={styles.detailedCommits}>
        <Text style={styles.detailedtext}>Commits:    {route.params.d.node.defaultBranchRef.target.history.totalCount} </Text>
        <Text style={styles.detailedtext}>Created at:    {route.params.d.node.createdAt} </Text>
        <Text style={styles.detailedtext}>Forks:    {route.params.d.node.forkCount} </Text>
        <Text style={styles.detailedtext}>Url:    {route.params.d.node.url} </Text>
      </View>
    </SafeAreaView>

    )
};

function getYear(m,y){
  if(m == 0) {
    y = y-1;
    m = '12';
  }
  else {
    if(m < 10){
      m = '0' + m.toString();
    }
    else{
      m = m.toString();
    }
  }
  return y.toString() + '-' + m;
}

function getCorrectDate(d){
  if(d < 10){
    d = '0' + d.toString();
  }
  return d;
}

const Main = ({dataOverView,navigation}) => {
  const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {

      var date = new Date().getDate();
      var month = new Date().getMonth();
      var year = new Date().getFullYear();
      console.log(currentDate);
      setCurrentDate(
      getYear(month, year) +  '-' + getCorrectDate(date)
      );

    }, []);

  const [selectedValue, setSelectedValue] = useState("all");
  const { loading, data, error } = useQuery(GITHUB_DATA, {
      variables:
        selectedValue === 'all'
        ? {  "query":` created:>${currentDate}`}
        : {  "query": `language:${selectedValue} created:>${currentDate}`},
        pollInterval: 500,


    });
  if (loading) return  <View style={styles.loading}><ActivityIndicator size="small" color="gray" /></View>;
  if (error) return <Text> `Error! ${error.message}`</Text>;




  return(
    <SafeAreaView>

      <Picker
       selectedValue={selectedValue}
       style={{ height: 50, width: "100%", position: 'relative' }}
       onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
       >
       <Picker.Item label="Top Overall" value="all" />
       <Picker.Item label="JavaScript" value="js" />
       <Picker.Item label="TypeScript" value="typescript" />
       <Picker.Item label="Go" value="go" />
       <Picker.Item label="Rust" value="rust" />
       <Picker.Item label="Swift" value="swift" />
       <Picker.Item label="Kotlin" value="kotlin" />
       <Picker.Item label="PHP" value="php" />
       <Picker.Item label="CSS" value="css" />
       <Picker.Item label="C" value="c" />
       <Picker.Item label="C++" value="c++" />
       <Picker.Item label="C#" value="c#" />
       <Picker.Item label="Python" value="python" />
       <Picker.Item label="Ruby" value="ruby" />
       <Picker.Item label="Java" value="java" />
      </Picker>
      <ScrollView>

        <View style={styles.viewRepo}>
          {data.search.edges.map(function (d) {
             return (
               <TouchableOpacity key={d.node.name} style={styles.touchableRepo} onPress={() => navigation.navigate('Details',{d})}>
                <Text style={styles.name}>{d.node.name}</Text>
                {console.log(d.node.name)}
                <Text style={styles.owner}>{d.node.owner.login}/{d.node.name}</Text>
                <Text style={styles.description}>{d.node.description}</Text>
                <View style={styles.forksAndStars}>
                  <View style={styles.viewStars}>
                     <Text style={styles.stars}>Stars: {d.node.stargazers.totalCount}  </Text>

                  </View>
                  <View style={styles.viewForks}>
                     <Text style={styles.forks}> Forks: {d.node.forkCount} </Text>
                  </View>
                </View>
               </TouchableOpacity>
             )
           })}

        </View>

      </ScrollView>

    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  viewRepo:{
    padding: 10,
    backgroundColor: '#1c1d1f',
  },
  touchableRepo: {
    flex: 1,
    width: '98%',
    margin: 5,
    backgroundColor: '#373a3d',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  name:{
    fontSize: 15,
    color: '#bdbdbd',
    fontWeight: "bold",
    margin: 5,

  },
  owner:{
    fontSize: 10,
    color: 'gray',
    margin: 5,
  },
  description:{
    fontSize: 10,
    margin: 5,
    color: '#bdbdbd',
  },
  forksAndStars:{
    flexDirection:'row-reverse',
    width: '100%',
    height: 20,
  },
  viewForks:{
    backgroundColor:'#353636',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    paddingRight: 2,

  },
  viewStars:{
    backgroundColor:'#ffee8f',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    borderBottomRightRadius: 5,
  },
  forks:{
    fontSize: 7,
    fontWeight: "bold",
    color:'#bdbdbd',
  },
  stars:{
    fontSize: 7,
    fontWeight: "bold",
    color: 'black',
  },
  headerText:{
    fontSize: 25,
    color: 'gray',
  },

  detailedHeader:{
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  detailedDescription:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedtext:{
    fontSize: 15,
    color: 'gray',
  },

  detailedView:{
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading:{
    padding:15,
    alignItems: 'center',
    justifyContent: 'center',
  }

});

export default App
