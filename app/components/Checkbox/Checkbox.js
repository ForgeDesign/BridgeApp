import React from 'react'
import ReactNative from 'react-native'
import iconDb from './iconDb'
import PropTypes from 'prop-types';

const { Component } = React
const { View, Text, TouchableOpacity, StyleSheet } = ReactNative
const defaultIcon = iconDb[8]

export default class Checkbox extends Component {

    constructor(props) {
        super(props)
        this.state = { checked: this.props.checked }
    }

    uncheck() {
        this.setState({ checked:false })
    }

    check() {
        this.setState({ checked:true })
    }

    _onChange() {
        const newVal = !this.state.checked
        const { onChange } = this.props
        this.setState({ checked:newVal }, () => {
            onChange(newVal)
        })
    }

    _renderIcon(iconName) {

        const { iconSize, iconStyle, checkedColor, uncheckedColor } = this.props
        const checked = this.state.checked
        const index = iconDb.findIndex(i => i.iconName === iconName)

        if (index !== -1) {
            defaultIcon = iconDb[index]
        }

        const { component: Icon, checkedIconName, uncheckedIconName } = defaultIcon

        return (
            <Icon
                name={checked ? checkedIconName : uncheckedIconName}
                size={iconSize}
                color={checked ? checkedColor : uncheckedColor}
                style={iconStyle}
            />
        )
    }

    _renderContent() {

        const { labelPosition, labelStyle, label, iconName } = this.props
        const flexDirection = labelPosition === 'left' ? 'row-reverse' : 'row'

        return (
            <View style={[styles.contentStyle, { flexDirection }]}>
                {this._renderIcon.call(this, iconName)}
                {label && < Text style={labelStyle}>{label}</Text>}
            </View>
        )
    }

    render() {
        const { style } = this.props
        return (
            <TouchableOpacity
                onPress={this._onChange.bind(this)}
                style={style}
            >
                {this._renderContent.call(this)}
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    contentStyle: {
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 16,
        marginLeft: 3
    }
})

Checkbox.propTypes = {
    style: Text.propTypes.style,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    labelPosition: PropTypes.string,
    labelStyle: Text.propTypes.style,
    iconName: PropTypes.string,
    iconStyle: Text.propTypes.style,
    iconSize: PropTypes.number,
    checkedColor: PropTypes.string,
    uncheckedColor: PropTypes.string,
}

Checkbox.defaultProps = {
    style: {},
    checked: false,
    labelPosition: 'right',
    labelStyle: styles.labelStyle,
    iconName: 'iosMix',
    iconStyle: {},
    iconSize: 30,
    checkedColor: '#464646',
    uncheckedColor: '#464646',
}