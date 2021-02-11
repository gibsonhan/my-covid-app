import * as WebBrowser from 'expo-web-browser';
async function openForm() {
  const FeedbackFormUrl = "https://forms.gle/nQJsCKKpqkak6zD38";

  try {
    await WebBrowser.openBrowserAsync(FeedbackFormUrl);
  }
  catch (error) {
    console.log('failed to open')
  }
}

export { openForm };
