import React from "react";
import {
	View,
	Dimensions,
	Platform,
	LayoutAnimation,
	Keyboard,
} from "react-native";

export default class KeyboardPadder extends React.Component {
	constructor(props) {
		super(props);
		this._listeners = null;
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
		this.state = {isKeyboardOpened: false};
	}
	
	componentWillMount() {
		const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace)
    ];
  }
	
	componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }
	
	updateKeyboardSpace(event) {
		if(!event.endCoordinates) {
      return;
    }
		
		let animationConfig = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing]
      );
    }
    LayoutAnimation.configureNext(animationConfig);
		
		// get updated on rotation
    const screenHeight = Dimensions.get('window').height;
    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one		
    const keyboardSpace = (screenHeight - event.endCoordinates.screenY);
		
		this.props.handleKeyboard(keyboardSpace);
		this.setState({isKeyboardOpened: true});
	}
	
	resetKeyboardSpace(event) {
		if(!this.state.isKeyboardOpened) {
			return;
		}
		
		let animationConfig = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing]
      );
    }
    LayoutAnimation.configureNext(animationConfig);

		this.props.handleKeyboard(0);
    this.setState({isKeyboardOpened: false});
	}
	
	render() {
		return <View />;
	}
}

export const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200
  }
};
