import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const NETFLIX_RED = "#E50914";

export default function SplashScreen() {
  // Stage 1: icon starts BIG and shrinks down to normal size (the "splash")
  const iconScale = useRef(new Animated.Value(50)).current;
  const iconOpacity = useRef(new Animated.Value(50)).current;
  const glowOpacity = useRef(new Animated.Value(10)).current;

  // Stage 2: once settled, the icon slides left to make room for the title
  const iconTranslateX = useRef(new Animated.Value(100)).current;

  // Stage 3: the title fades/writes in on the right side of the icon
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateX = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.sequence([
      // Stage 1: icon bursts in big and shrinks to its resting size,
      // the red glow behind it fades out as it settles — that's the "splash"
      Animated.parallel([
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      // Stage 2: icon slides left
      Animated.timing(iconTranslateX, {
        toValue: -60,
        duration: 400,
        useNativeDriver: true,
      }),
      // Stage 3: title writes in beside it
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Stage timings: 700 + 400 + 400 = 1500ms, plus a moment to hold on screen
    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Animated.View
          style={[
            styles.iconWrapper,
            { transform: [{ translateX: iconTranslateX }] },
          ]}
        >
          {/* red glow sits behind the icon, only visible during the splash-in */}
          <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />
          <Animated.Text
            style={[
              styles.icon,
              {
                opacity: iconOpacity,
                transform: [{ scale: iconScale }],
              },
            ]}
          >
            🎬
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateX: titleTranslateX }],
            },
          ]}
        >
          CineVerse
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 200,
    height: 100,
    borderRadius: 65,
    backgroundColor: "#000000",
  },
  icon: {
    fontSize: 100,
  },
  title: {
    fontSize: 50,
    color: "#b51111",
    fontWeight: "bold",
    marginLeft: -50,
    letterSpacing: 0.5,
  },
});
