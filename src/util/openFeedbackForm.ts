import { Linking } from "react-native";

async function openForm() {
  const FeedbackFormUrl = "https://forms.gle/nQJsCKKpqkak6zD38";
  const supported = await Linking.canOpenURL(FeedbackFormUrl);

  if (supported) {
    await Linking.openURL(FeedbackFormUrl);
  } else {
    console.log("Error with opening form");
  }
}

export { openForm };
