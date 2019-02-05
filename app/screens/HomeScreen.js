import React from 'react';
import styled from 'styled-components/native';
import { observer, inject } from 'mobx-react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { WebBrowser } from 'expo';
import { Observable } from 'rxjs';
import AxiosSubscriber from '../lib/apiAxios';


const ContainerView = styled.View`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: ${props => props.theme.baseBreezeColorDark}
`;

const TitleText = styled.Text`
fontSize: 30;
color: ${props => props.theme.baseTextColor};
`;

@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    let observable$ = new Observable( ( observer ) => {
      return new AxiosSubscriber( observer );
    });
    let subscription = observable$.subscribe( console.log );
    setTimeout( () => {
      subscription.unsubscribe();
  } );
    console.log(subscription);
   }
   
     render() {
       return (
         <ContainerView>
           <TitleText>{this.props.navigation.state.routeName}</TitleText>
           <TitleText>DemostrationVariable: Hi !</TitleText>
         </ContainerView>
       );
     }
   }
