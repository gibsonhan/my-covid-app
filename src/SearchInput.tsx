import React from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";
import OctIcon from "react-native-vector-icons/Octicons";

import Bttn from './components/common/Bttn'
import CenterIcon from "./components/common/CenterIcon";

export interface SearchInputInterface {
	setText: (text: string) => void;
	handleFetchData: () => void;
	value?: string;
}
function SearchInput(props: SearchInputInterface) {
	const { handleFetchData, setText, value } = props;
	return (
		<View style={styles.root}>
			<View style={styles.search}>
				<CenterIcon height={40} width={40} icon={<OctIcon name="search" />} />
				<TextInput
					style={styles.textInput}
					placeholder="Enter State or Zip Code"
					onChangeText={setText}
					value={value}
				/>
			</View>
			<Bttn
				title="Search"
				onPress={handleFetchData}
				height={40}
				width={80}
				style={{ marginTop: 10 }}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	root: {
		display: 'flex',
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: "absolute",
		top: 60,
	},
	search: {
		flexDirection: "row",
		backgroundColor: "white",
	},
	textInput: {
		width: Dimensions.get("window").width * 0.5,
		paddingLeft: 10,
		height: 40,
		borderWidth: 0,
	},
});
export default SearchInput;
