//TODO Figure out why this does not work
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";

interface OptionLabel {
  routeName: string;
  focused?: boolean;
  size?: number;
  color?: string;
}

export default function IconSelecton(optionObj: OptionLabel): JSX.Element {
  const { routeName, focused, size, color } = optionObj;

  const JSXElement: { [key: string]: JSX.Element } = {
    ["COVID"]: <MaterialIcon name="coronavirus" size={size} color={color} />,
    ["News"]: <EntypoIcon name="line-graph" size={size} color={color} />,
    ["Login"]: <AntIcon name="login" size={size} color={color} />,
    ["Feedback"]: <MaterialIcon name="feedback" size={size} color={color} />,
  };

  return JSXElement[routeName];
}
