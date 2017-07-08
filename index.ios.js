/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	StatusBar,
	ListView,
	TextInput,
} from 'react-native';

import KeyboardPadder from './keyboardpadder';

export default class KeyboardAvoid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyboardSpace: 0
		};
	}
	
	handleKeyboard(paddingBottom) {
		this.setState({keyboardSpace: paddingBottom});
	}
	
  render() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		
		let dataRows = [];
		for(i=0; i < 100; ++i) {
			dataRows.push('row '+i);
		}
		
		return (
      <View style={styles.container}>
				<StatusBar hidden={true} />
      	<ListView 
					ref="messageList"
					style={[styles.list, {bottom: this.state.keyboardSpace}]}
					onContentSizeChange={() => this.refs.messageList.scrollToEnd()}
					dataSource={ds.cloneWithRows(dataRows)}
		      renderRow={(data) => <View><Text>{data}</Text></View>}
				/>
		    <TextInput
					style={[styles.textInput, {bottom: this.state.keyboardSpace}]}
					keyboardType="default"
					placeholder={"Text input..."}
		    />
				<KeyboardPadder handleKeyboard={this.handleKeyboard.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
	list: {
		flex: 1,
		backgroundColor: "#fc0",
	},
	textInput: {
		height: 50,
		paddingLeft: 8,
	},
});

AppRegistry.registerComponent('KeyboardAvoid', () => KeyboardAvoid);
