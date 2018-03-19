import React from 'react';
import { Col, Grid } from "react-native-easy-grid"
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import styles from './styles';

class Header extends React.Component {

    state = {
        props: {
            title: ""
        }
    }

    constructor(props) {
        super(props)
        this.state = {props}
    }

    componentWillReceiveProps(props) {
        this.setState({props})
    } 

    render() {
        
        back = <View/>
        if (this.state.props.back)
            back = <TouchableOpacity onPress={() => this.state.props.back()}> 
                        <Icon
                            name={'ios-arrow-back'}
                            style={styles.back}
                        />
                    </TouchableOpacity>

        logout = <View/>
        if (this.state.props.logout)
            logout = <TouchableOpacity onPress={() => this.state.props.logout()}> 
                        <Text style={styles.logout}>Log out</Text>
                    </TouchableOpacity>
        
        plus = <View/>
        if (this.state.props.plus)
            plus = <TouchableOpacity onPress={() => this.state.props.plus()}> 
                        <Icon
                            name={'md-add'}
                            style={styles.plus}
                        />
                    </TouchableOpacity>
        
        return(
            <View style={styles.container}>
                <StatusBar translucent={false} barStyle="light-content" />
                <View style={{flexDirection: 'row'}}>
                    <Grid style={styles.grid}>
                        <Col size={25}>
                            {back}
                        </Col>
                        <Col size={50}>
                            <Text style={styles.title}>{this.state.props.title}</Text>
                        </Col>
                        <Col size={25}>
                            {logout}{plus}
                        </Col>
                    </Grid>
                </View>
            </View>
        )
    }

}

export default Header;
