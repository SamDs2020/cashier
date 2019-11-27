import React from "react";
import {
  Layout,
  TopNavigation,
  Avatar,
  Text,
  Button
} from "react-native-ui-kitten";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Title, IconButton, Surface, Snackbar, Subheading } from "react-native-paper";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GetTokenInfo, $axios, DeleteToken } from "../utilities/helper";
import RNPickerSelect from 'react-native-picker-select';
import Axios from "axios";



const items = ["Movies", "Dining", "Gro"];


const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20
  }
};
export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      ageRange: "15-24",
      preferences: [],
      location: "Lagos",
      loggingOut: false,
      items: [
        "Movies", "Dining", "Groceries", "Events", "Fashion", "Beauty & Personal Care", "Hotels", "Shopping", "Technology" , "Home & Tools", "Sports & Outdoors"
      ],
      selectedItems: []
    };
  }

  componentDidMount() {
    GetTokenInfo()
      .then(async info => {
        const axiosInstance = await $axios();
        axiosInstance
          .get(`/user/customer/${info.id}`)
          .then(res => {
            this.setState({ profile: { ...res.data }, ageRange: res.data.ageRange, selectedItems: res.data.preferences });
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => console.log(error));
  }


  handleUpdate = async () => {
    const { profile, ageRange, location, selectedItems } = this.state;
    try {
      const update = await Axios.post("https://moni-server.herokuapp.com/api/user/update", { 
        userId: profile._id, 
        ageRange, 
        location, 
        preferences: selectedItems
      });

      console.log("update", update);
      
      this.setState({
        visible: true,
        msg: "Profile sucessfully updated"
      });
    } catch (error) {
      console.log('error', error);
      console.log('error', error.response);
      this.setState({
        visible: true,
        msg: "An error occurred while updating your profile"
      });
    }
  }

  handleLogout = async () => {
    this.setState({ loggingOut: true });
    await DeleteToken();
    this.setState({ loggingOut: false });
    this.props.navigation.navigate("login");
  }



  handleSelectItem = (selected) => {
    const { selectedItems } = this.state;
    if (selectedItems.length <= 2) {
      selectedItems.push(selected);
      this.setState({
        selectedItems
      });
      return
    }
    if (selectedItems.includes(selected)) {
      selectedItems.splice(selectedItems.indexOf(items), 1);
      this.setState({
        selectedItems
      });
      return
    }

    this.setState({
      visible: true,
      msg: "You can't select more than three preference"
    })
  }

  render() {
    const { ageRange, location, selectedItems, items } = this.state;
    console.log("this.state", this.state);
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.profile ? (
          <>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Title>Profile</Title>
              <IconButton
                icon="exit-to-app"
                size={25}
                color="red"
                onPress={this.handleLogout}
              />
            </View>
            <Layout style={styles.container}>
              <Layout style={{ flex: 1, padding: 20 }}>
                {/*  <Layout style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={this.toggleModal}>
                    <Avatar
                      size="giant"
                      source={require("../../assets/icons/boy.png")}
                    />
                  </TouchableOpacity>
                  <Layout style={{ marginLeft: 20 }}>
                    <Text style={{ color: "#2d3436" }} category="h4">
                      {this.state.profile.name}
                    </Text>
                    <Layout style={{ flexDirection: "row" }}>
                      <Text category="s1">Gems:</Text>
                      <Text
                        style={{ marginLeft: 5, color: "#2ecc71" }}
                        category="s1"
                      >
                        {this.state.profile.gemPoints.currentGems}
                      </Text>
                    </Layout>

                    <Layout style={{ height: 200 }}></Layout>
                  </Layout>
                </Layout> */}
                <Subheading>Select your age range</Subheading>
                <RNPickerSelect
                  Icon={() => {
                    return (
                      <IconButton
                        icon="arrow-drop-down"
                        size={25}
                        color="grey"
                      />
                    );
                  }}
                  onValueChange={ageRange => this.setState({ ageRange })}
                  style={{
                    inputIOS: {
                      ...pickerSelectStyles.inputIOS
                    },
                    inputAndroid: {
                      ...pickerSelectStyles.inputAndroid
                    },
                    iconContainer: {
                      top: 2,
                      right: 10
                    }
                  }}
                  items={[
                    { label: "15-24 Yrs", value: "15-24" },
                    { label: "24-34 Yrs", value: "25-34" },
                    { label: "35-44 Yrs", value: "35-44" },
                    { label: "45-54 Yrs", value: "45-54" },
                    { label: "55-64 Yrs", value: "55-64" },
                    { label: "65-74 Yrs", value: "65-74" },
                    { label: "75-84 Yrs", value: "75-84" }
                  ]}
                  value={ageRange}
                />

                <Subheading>Select your location</Subheading>
                <RNPickerSelect
                  Icon={() => {
                    return (
                      <IconButton
                        icon="arrow-drop-down"
                        size={25}
                        color="grey"
                      />
                    );
                  }}
                  onValueChange={location => this.setState({ location })}
                  style={{
                    inputIOS: {
                      ...pickerSelectStyles.inputIOS
                    },
                    inputAndroid: {
                      ...pickerSelectStyles.inputAndroid
                    },
                    iconContainer: {
                      top: 2,
                      right: 10
                    }
                  }}
                  items={[
                    { label: "Lagos", value: "Lagos" },
                    { label: "Abia", value: "Abia" },
                    { label: "Adamawa", value: "Adamawa" },
                    { label: "Anambra", value: "Anambra" },
                    { label: "Akwa Ibom", value: "Akwa Ibom" },
                    { label: "Bauchi", value: "Bauchi" },
                    { label: "Bayelsa", value: "Bayelsa" },
                    { label: "Benue", value: "Benue" },
                    { label: "Borno", value: "Borno" },
                    { label: "Cross River", value: "Cross River" },
                    { label: "Delta", value: "Delta" },
                    { label: "Ebonyi", value: "Ebonyi" },
                    { label: "Enugu", value: "Enugu" },
                    { label: "Edo", value: "Edo" },
                    { label: "Ekiti", value: "Ekiti" },
                    { label: "FCT - Abuja", value: "FCT - Abuja" },
                    { label: "Gombe", value: "Gombe" },
                    { label: "Imo", value: "Imo" },
                    { label: "Jigawa", value: "Jigawa" },
                    { label: "Kaduna", value: "Kaduna" },
                    { label: "Kano", value: "Kano" },
                    { label: "Katsina", value: "Katsina" },
                    { label: "Kebbi", value: "Kebbi" },
                    { label: "Kogi", value: "Kogi" },
                    { label: "Kwara", value: "Kwara" },
                    { label: "Nasarawa", value: "Nasarawa" },
                    { label: "Niger", value: "Niger" },
                    { label: "Ogun", value: "Ogun" },
                    { label: "Ondo", value: "Ondo" },
                    { label: "Osun", value: "Osun" },
                    { label: "Oyo", value: "Oyo" },
                    { label: "Plateau", value: "Plateau" },
                    { label: "Rivers", value: "Rivers" },
                    { label: "Sokoto", value: "Sokoto" },
                    { label: "Taraba", value: "Taraba" },
                    { label: "Yobe", value: "Yobe" },
                    { label: "Zamfara", value: "Zamfara" }
                  ]}
                  value={location}
                />

                <ScrollView>
                  <Subheading>Select a Preference</Subheading>
                {
                  items.map(item => (
                    <TouchableOpacity key={item} onPress={() => this.handleSelectItem(item)}>
                      <Surface style={{ elevation: selectedItems.includes(item) ? 4 : 0, backgroundColor: selectedItems.includes(item) ? "grey" : "transparent" }}>
                        <Text style={{ padding: 10 }}>{item}</Text>
                      </Surface>
                    </TouchableOpacity>
                  ))
                }
                </ScrollView>
                
                
                <Button
                  disabled={this.state.loggingOut}
                  onPress={this.handleUpdate}
                  appearance="filled"
                  status="success"
                  size="large"
                >
                  Save Changes
              </Button>
              </Layout>
              
            </Layout>
          </>
        ) : null}
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          // action={{
          //   label: 'Undo',
          //   onPress: () => {
          //     // Do something
          //   },
          // }}
        >
          {this.state.msg}
        </Snackbar>
      </SafeAreaView>
    );
  }
}


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: "black",
    marginLeft: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    color: "black",
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});



{/* <RNPickerSelect
                  Icon={() => {
                    return (
                      <IconButton
                        icon="arrow-drop-down"
                        size={25}
                        color="grey"
                      />
                    );
                  }}
                  onValueChange={this.handleSelectItem}
                  style={{
                    inputIOS: {
                      ...pickerSelectStyles.inputIOS
                    },
                    inputAndroid: {
                      ...pickerSelectStyles.inputAndroid
                    },
                    iconContainer: {
                      top: 2,
                      right: 10
                    }
                  }}
                  items={[
                    { label: "Movies", value: "Movies" },
                    { label: "Dining", value: "Dining" },
                    { label: "Groceries", value: "Groceries" },
                    { label: "Events", value: "Events" },
                    { label: "Fashion", value: "Fashion" },
                    { label: "Beauty & Personal Care", value: "Beauty & Personal Care" },
                    { label: "Hotel", value: "Hotel" },
                    { label: "Technology", value: "Technology" },
                    { label: "Home & Tools", value: "Home & Tools" },
                    { label: "Sports & Outdoors", value: "Sports & Outdoors" },
                  ]}
                  value={""}
                /> */}