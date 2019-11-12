import React, { Component } from "react";
import {} from "react-native-ui-kitten";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import moment from "moment";

const styles = StyleSheet.create({
    transaction: {
        flex: 1,
        flexGrow: 1,
        padding: 5,
        flexDirection: "column",
        borderBottomColor: "#2F45B4",
        borderBottomWidth: 0.5
    },
    transactionInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    image: {
        resizeMode: "contain",
        tintColor: "#2F45B4",
        height: 40,
        width: 40,
        marginRight: 10
    }
});

export default function Transaction(props) {
    console.log("prpropspropspropspropsops", JSON.stringify(props.trans.items));
    
    return (
      <View style={styles.transaction}>
        <Text style={{ color: "#2F45B4", paddingHorizontal: 5 }}>
          {moment(props.trans.createdAt).format("MMM DD, YYYY")}
        </Text>
        <View style={styles.transactionInfo}>
          {/* <Image style={styles.image} source={require("../../assets/hotel.png")} /> */}
          <View>
            {props.trans.items.map((item, index) => (
              <Text
                key={index}
                style={{ flex: 1, flexWrap: "wrap", color: "#2F45B4" }}
              >
                {item.name} - {item.price}
              </Text>
            ))}
          </View>
          <Text style={{ color: props.color }}>
            ₦{props.trans.total}
          </Text>
        </View>
      </View>
    );
}
