import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, fontStyles } from '../../styles/common';
import DefaultTabBar from 'react-native-scrollable-tab-view/DefaultTabBar';
import AddCustomToken from '../AddCustomToken';
import SearchTokenAutocomplete from '../SearchTokenAutocomplete';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';
import { strings } from '../../../locales/i18n';
import AddCustomCollectible from '../AddCustomCollectible';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: colors.slate
	},
	tabUnderlineStyle: {
		height: 2,
		backgroundColor: colors.primary
	},
	tabStyle: {
		paddingBottom: 0
	},
	textStyle: {
		fontSize: 16,
		letterSpacing: 0.5,
		...fontStyles.bold
	}
});

/**
 * Component that provides ability to add assets.
 */
export default class AddAsset extends Component {
	static navigationOptions = () => ({
		title: strings('addAsset.title'),
		headerTitleStyle: {
			fontSize: 20,
			...fontStyles.normal
		}
	});

	state = {
		address: '',
		symbol: '',
		decimals: ''
	};

	static propTypes = {
		/**
		/* navigation object required to push new views
		*/
		navigation: PropTypes.object
	};

	renderTabBar() {
		return (
			<DefaultTabBar
				underlineStyle={styles.tabUnderlineStyle}
				activeTextColor={colors.primary}
				inactiveTextColor={colors.fontTertiary}
				backgroundColor={colors.white}
				tabStyle={styles.tabStyle}
				textStyle={styles.textStyle}
			/>
		);
	}

	render() {
		const {
			navigation: {
				state: {
					params: { assetType }
				}
			},
			navigation
		} = this.props;
		return (
			<View style={styles.wrapper} testID={`add-${assetType}-screen`}>
				{assetType === 'token' ? (
					<ScrollableTabView renderTabBar={this.renderTabBar}>
						<SearchTokenAutocomplete
							navigation={navigation}
							tabLabel={strings('addAsset.search_token')}
							testID={'tab-search-token'}
						/>
						<AddCustomToken
							navigation={navigation}
							tabLabel={strings('addAsset.custom_token')}
							testID={'tab-add-custom-token'}
						/>
					</ScrollableTabView>
				) : (
					<AddCustomCollectible navigation={navigation} testID={'add-custom-collectible'} />
				)}
			</View>
		);
	}
}
