import React, { Component } from "react";
import { View, RefreshControl, Text, AsyncStorage } from "react-native";
import Banner from "../components/banner";
import { styles } from "../styles/balance.style";
import { ScrollView } from "react-native-gesture-handler";
import Transaction from "../components/transaction";
import { GetTokenInfo, $axios } from "../utilities/helper";
import { async } from "q";

export default class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      refreshing: false,
      transactions: [],
      userId: null,
      user: null
    };
  }

  componentWillMount() {
    GetTokenInfo()
      .then(async info => {
        console.log(info);
        const result = await this.updateData(info);
        console.log(result);
        this.setState({
          user: info
        })
      })
      .catch(error => console.log(error));
  }

  updateData(info) {
    return Promise.all([
      this.getTransactions(info),
      this.getBalance(info)
    ]).then(res => {
      console.log(res);
      return res.data;
    });
  }

  async getTransactions(info) {
    const axiosInstance = await $axios();
    return axiosInstance.get(`/transaction/customer/${info._id}`).then(res => {
      console.log(res.data);
      this.setState({
        transactions: res.data,
        userId: info._id
      });
    }).catch(async(error) => {
      console.log(JSON.stringify(error));
      await AsyncStorage.removeItem("token-moni");
    });
  }

  async getBalance(info) {
    const axiosInstance = await $axios();
    return axiosInstance.get(`/user?id=${info.id}`).then(res => {
      console.log(res.data);
      this.setState({
        balance: res.data.gemPoints.currentGems
      });
    });
  }

  async handleRefresh() {
    this.setState({ refreshing: true });

    const axiosInstance = await $axios();
    axiosInstance.get(`/transaction/customer/${this.state.userId}`).then(res => {
      console.log(res.data);
      this.setState({
        transactions: res.data,
        refreshing: false
      });
    });
  }

  render() {
    const { transactions } = this.state;
    console.log("transactionstransactionstransactionstransactions", this.state);
    
    return (
      <View style={styles.layout}>
        <Banner>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Balance</Text>
        </Banner>
        <View style={styles.balance}>
          <Text
            style={{ letterSpacing: 3, color: "#2F45B4", fontSize: 30 }}
            category="h4"
          >
            {`M${this.state.balance}`}
          </Text>
        </View>
        <View style={styles.transactions}>
          <View style={styles.transactionText}>
            <Text
              style={{
                color: "#2F45B4",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "500"
              }}
            >
              Transactions
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.handleRefresh()}
              />
            }
          >
            {transactions.map(tran => (
              <Transaction color="green" key={tran._id} trans={tran} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}
