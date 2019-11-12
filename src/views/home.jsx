import React from "react";
import { View, Image, Dimensions, SafeAreaView, Text, AsyncStorage } from "react-native";
import { Card } from "react-native-paper";
import { $axios, GetTokenInfo } from "../utilities/helper";
import { styles } from "../styles/home.style";
import { Vendor } from "../components/vendor.component";
import { Layout, TopNavigation, TopNavigationAction, Avatar } from "react-native-ui-kitten";
import { TouchableOpacity } from "react-native-gesture-handler";
import Info from "../components/info";
import Carousel from "react-native-snap-carousel";
import Offer from "../components/offer";
import axios from "axios";


export default class Home extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            user: "",
            id: "",
            data: {}
        };
    }

    componentDidMount() {
        GetTokenInfo()
            .then(info => {
                console.log("info", info);
                
                this.setState({ user: info.name, id: info.id });
            })
            .catch(error => console.error(error));
        
        
    }


    async componentDidUpdate(prevProps, prevState) {

        // console.log("prevProps", prevProps);
        // console.log("prevState", prevState);
        if(prevState.id !== this.state.id) {
            console.log("this.state.id", this.state.id);
            
            const axiosInstance = await $axios();
            axiosInstance
            .get(`/user/customer/${this.state.id}`)
            .then(async res => {
                if (!res.data) throw "Error";

                console.log("res.data", res.data);

                this.setState({ data: res.data });
            })
            .catch(error => {
                console.log("error", JSON.stringify(error));

                if (error.message === "Network Error") {
                console.log("Network Error!");
                return;
                }
            })
            .finally(() => {
                console.log("Finally...");
                this.setState({ ...this.state, loading: false });
            });
        }
        
    }
    

    login = async () => {
        const { navigation } = this.props;

        await AsyncStorage.removeItem("token-moni");
        navigation.navigate("login")
    }

    render() {
        const { width, height } = Dimensions.get("window");

        console.log("this.state", this.state);
        const { data } = this.state;
        
        return (
          <SafeAreaView>
            {/* <TopNavigation
                    rightControls={this.renderCustomerCareAction()}
                    alignment="center"
                    title={this.state.user ? `Hi! ${this.state.user}` : "Hello!"}
                    titleStyle={{ fontSize: 20 }}
                /> */}
            <Layout>
              <View
                style={{
                  //   flex: 1,
                  backgroundColor: "#fff",
                  borderColor: "#ccc",
                  alignItems: "center",
                  marginHorizontal: 50,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    alignItems: "center"
                    // flex: 1,
                    // padding: 30
                  }}
                >
                  <View style={{ position: "relative" }}>
                    {data.membershipType === "blue" && (
                      <Image
                        style={{
                          tintColor: "#3498db",
                          position: "absolute",
                          top: 25,
                          left: 20,
                          width: 50,
                          height: 30,
                          zIndex: 999,
                          resizeMode: "contain"
                        }}
                        source={require("../../assets/icons/blue.png")}
                      />
                    )}

                    {data.membershipType === "gold" && (
                      <Image
                        style={{
                          tintColor: "#d4af37",
                          position: "absolute",
                          top: 25,
                          left: 20,
                          width: 50,
                          height: 30,
                          zIndex: 999,
                          resizeMode: "contain"
                        }}
                        source={require("../../assets/icons/gold.png")}
                      />
                    )}

                    {data.membershipType === "platinum" && (
                      <Image
                        style={{
                          tintColor: "#e5e4e2",
                          position: "absolute",
                          top: 25,
                          left: 20,
                          width: 50,
                          height: 30,
                          zIndex: 999,
                          resizeMode: "contain"
                        }}
                        source={require("../../assets/icons/platinum.png")}
                      />
                    )}

                    <Avatar
                      style={{
                        width: 350,
                        height: 350,
                        backgroundColor: "#ecf0f1"
                      }}
                      source={require("../../assets/icons/man.png")}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 20,
                      color: "#57606f",
                      fontSize: 50,
                      fontWeight: "300",
                      textTransform: "capitalize"
                    }}
                    category="h1"
                  >
                    {this.state.user}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 50
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "500",
                        marginLeft: 5,
                        color: "#2ed573"
                      }}
                    >
                      {/* {this.state.user.gemPoints.currentGems} */}
                      {typeof data.gemPoints !== "undefined" &&
                        data.gemPoints.accumulatedGems}
                    </Text>
                    <Text style={{ fontSize: 30, color: "#57606f" }}>
                      {" "}
                      Gems
                    </Text>
                  </View>
                </View>
              </View>
            </Layout>
          </SafeAreaView>
        );
    }
}
