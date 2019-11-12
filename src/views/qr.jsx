import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Layout } from "react-native-ui-kitten";
import Banner from "../components/banner";
import QRCode from "react-native-qrcode-svg";
import { styles } from "../styles/qrcode.style";
import { sharedStyles } from "../styles/shared.style";
import { GetTokenInfo, $axios, SaveFirstTimer } from "../utilities/helper";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            user: ""
        };
    }

    componentWillMount() {
        GetTokenInfo()
            .then(info => this.setState({ value: info.id, user: info.name }))
            .catch(console.error);
    }

    async handlePreferenceSetup() {
        //save prefrences to db first
        const axiosInstance = await $axios();
        const preferences = this.props.navigation.getParam("preferences");
        axiosInstance
            .post("/user/pref", { preferences, userId: this.state.value })
            .then(async res => {
                if (res.data.message === "success") {
                    if (await SaveFirstTimer()) {
                        this.props.navigation.navigate("home");
                        return;
                    } else console.log("An error ocurred while saving variable!!");
                }
                throw "An error ocurred pls contact your admin";
            })
            .catch(error => {
                console.log(error);
                if (error.message === "Network Error") {
                    console.log("Server is down!");
                    return;
                }
                console.log(error.response.data.error);
            });
    }
    render() {
        return (
            <Layout style={styles.layout}>
                <Banner>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ fontSize: 18, paddingRight: 10 }}>Your QR Code is Ready</Text>
                        <Image
                            style={{ resizeMode: "contain", width: 20, height: 20 }}
                            source={require("../../assets/icons/correct.png")}
                        />
                    </View>
                </Banner>
                <View style={styles.qr}>
                    <QRCode
                        value={this.state.value.trim() !== "" ? this.state.value : "NA"}
                        size={200}
                        color="black"
                        backgroundColor="white"
                    ></QRCode>
                </View>
                <View style={{ width: "70%", marginTop: 30 }}>
                    <Text
                        style={{
                            padding: 10,
                            textAlign: "center",
                            color: "#2B41AF",
                            fontSize: 20,
                            fontWeight: "600"
                        }}
                    >
                        Hooray!!
                    </Text>
                    <Text style={{ textAlign: "center", color: "#2B41AF", fontSize: 15 }}>
                        Landmark Citizen ID created successfully!
                    </Text>
                </View>
            </Layout>
        );
    }
}















































































// import React, { Component } from 'react';
// import QRCode from 'react-native-qrcode';
// import Modal from "react-native-modal";
// import { StyleSheet, View, Image } from 'react-native';
// import LottieView from "lottie-react-native";
// import { GetTokenInfo } from "../utilities/helper";
// import Banner from "../components/banner";
// import { Text, Layout } from "react-native-ui-kitten";



// export default class HelloWorld extends Component {
//     state = {
//         loading: true,
//         id: null,
//         user: null
//     };

//     componentDidMount() {
//         const { loading } = this.state;

//         if (loading) this.animation.play();

//         GetTokenInfo()
//             .then(info => this.setState({ id: info.id, user: info.name, loading: false }))
//             .catch(console.error);
//     }

//     render() {
//         const { loading } = this.state;

//         return (
//             <Layout style={styles.container}>
//                 {/* <Banner>
//                     <View
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "center",
//                             alignItems: "center"
//                         }}
//                     >
//                         <Text style={{ fontSize: 18, paddingRight: 10 }}>{this.state.user}</Text>
//                         <Image
//                             style={{ resizeMode: "contain", width: 20, height: 20 }}
//                             source={require("../../assets/icons/correct.png")}
//                         />
//                     </View>
//                 </Banner> */}
//                 {
//                     !loading && (
//                         <QRCode
//                             value={{ user: '2051020@gmail.com', loyaltyId: 'fasdfasdf' }}
//                             size={200}
//                             bgColor='black'
//                             fgColor='white' 
//                         />
//                     )
//                 }
//                 <Modal
//                     isVisible={loading}
//                     style={{
//                         padding: 0,
//                         margin: 0,
//                         justifyContent: "center",
//                         alignItems: "center"
//                     }}
//                 >
//                     <LottieView
//                         ref={animation => {
//                             this.animation = animation;
//                         }}
//                         style={{
//                             width: 250,
//                             height: 250
//                         }}
//                         source={require("../../assets/lottie/cube-loader.json")}
//                     />
//                 </Modal>
//             </Layout>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f6fa',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },

//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         margin: 10,
//         borderRadius: 5,
//         padding: 5,
//     }
// });











































// // import React, { Component } from "react";
// // import { View, Image } from "react-native";
// // import { Text, Layout } from "react-native-ui-kitten";
// // import Banner from "../components/banner";
// // import QRCode from "react-native-qrcode-svg";
// // import { styles } from "../styles/qrcode.style";
// // import { GetTokenInfo } from "../utilities/helper";

// // export default class QR extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             value: "",
// //             user: ""
// //         };
// //     }

//     // componentWillMount() {
//     //     GetTokenInfo()
//     //         .then(info => this.setState({ value: info.id, user: info.name }))
//     //         .catch(console.error);
//     // }

// //     render() {
// //         return (
// //             <Layout style={styles.layout}>
// //                 <Banner>
// //                     <View
// //                         style={{
// //                             display: "flex",
// //                             flexDirection: "row",
// //                             justifyContent: "center",
// //                             alignItems: "center"
// //                         }}
// //                     >
// //                         <Text style={{ fontSize: 18, paddingRight: 10 }}>{this.state.user}</Text>
// //                         <Image
// //                             style={{ resizeMode: "contain", width: 20, height: 20 }}
// //                             source={require("../../assets/icons/correct.png")}
// //                         />
// //                     </View>
// //                 </Banner>
// //                 <View style={styles.qr}>
// //                     <QRCode
// //                         value={this.state.value.trim() !== "" ? this.state.value : "NA"}
// //                         size={200}
// //                         color="black"
// //                         backgroundColor="white"
// //                     ></QRCode>
// //                 </View>
// //                 <View style={{ width: "70%" }}>
// //                     <Text style={{ textAlign: "center", color: "#7f8c8d" }}>
// //                         Your personal Landmark Citizen ID QR, Show this QR to Redeem or Earn Points
// //                     </Text>
// //                 </View>
// //             </Layout>
// //         );
// //     }
// // }
