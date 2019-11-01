# Concerns in React Native

Langutil runs purely on JavaScript. This means you do not need to run `react-native link` or mess around with the configuration at native level after installing.

Langutil would be a good library to consider especially if:

- your app is created using `expo init`, or
- you do not wish to deal with your project at native level (Using Android Studio or XCode).

Langutl still works even if your app is created using `react-native init`. But the fact that you have chosen to initialize your project with this command probably means that you're confident enough to deal with your project natively. If this is the case and you would like to have a finer control over your app, you may consider using other packages that handles localization at native level.
