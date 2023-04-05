import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import Constants from "expo-constants";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log("Constants", Constants.manifest);
  return (
    <NativeRouter>
      {console.log("In App: ", authStorage)}
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
