import React, {useEffect} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import axios from 'react-native-axios';

export default function Home() {
  useEffect(() => {
    (async () => {
      const result = await axios.get(
        'https://api.ninjasalary.com/get-dummy-dashboard-data/',
      );
      setData(result.data.data);
    })();
  }, []);

  const [number, setNumber] = React.useState(null);
  const [data, setData] = React.useState(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: '#ADD8E6CC',
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Hello {data?.first_name},
        </Text>
        <Text style={{fontSize: 18}}>
          You've earned Rs.{' '}
          {data?.balance_details?.monthly_salary_in_paisa / 100} this month.
          {'\n'}
          You can withdraw Rs.{' '}
          {data?.balance_details?.available_balance_in_paisa / 100}.
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ADD8E6',
          padding: 15,
        }}>
        <Text style={{fontSize: 22}}>Enter amount (Rs)</Text>
        <TextInput
          style={{
            margin: 10,
            color: '#222831',
            width: '60%',
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 7,
          }}
          onChangeText={e => {
            const x = Number(e);
            if (x > data?.balance_details?.available_balance_in_paisa / 100) {
              alert(
                `enter an amount less than ${
                  data?.balance_details?.available_balance_in_paisa / 100
                }`,
              );
            }
            setNumber(e);
          }}
          value={number}
          placeholder="Withdraw amount"
          placeholderTextColor="#222831"
          keyboardType="numeric"
        />
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'space-between',
            padding: 15,
          }}>
          <Button
            title="25%"
            onPress={() =>
              setNumber(
                `${data?.balance_details?.available_balance_in_paisa / 400}`,
              )
            }
          />
          <Button
            title="50%"
            onPress={() =>
              setNumber(
                `${data?.balance_details?.available_balance_in_paisa / 200}`,
              )
            }
          />
          <Button
            title="75%"
            onPress={() =>
              setNumber(
                `${
                  (data?.balance_details?.available_balance_in_paisa * 3) / 400
                }`,
              )
            }
          />
          <Button
            title="100%"
            onPress={() =>
              setNumber(
                `${data?.balance_details?.available_balance_in_paisa / 100}`,
              )
            }
          />
        </View>
        <Button
          title="Withdraw"
          onPress={() => {
            if (
              number >
              data?.balance_details?.available_balance_in_paisa / 100
            ) {
              alert('Enter a valid amount');
            } else if (number != '') {
              alert('Amount withdrawn succesfully');
              setNumber(``);
            } else {
              alert('Enter a valid amount');
            }
          }}
        />
      </View>
    </>
  );
}
