import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  Keyframe,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const logoIn = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ scale: 0.5 }, { translateY: 30 }],
    easing: Easing.bezier(0.22, 1.2, 0.36, 1) as any,
  },
  60: { opacity: 1, transform: [{ scale: 1.05 }, { translateY: 0 }] },
  100: { opacity: 1, transform: [{ scale: 1 }, { translateY: 0 }] },
}).duration(1050);

const letterIn = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: 20 }, { rotate: '5deg' }],
    easing: Easing.bezier(0.22, 1, 0.36, 1) as any,
  },
  100: { opacity: 1, transform: [{ translateY: 0 }, { rotate: '0deg' }] },
}).duration(550);

const bylineIn = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: 8 }],
    letterSpacing: 8,
    easing: Easing.bezier(0.22, 1, 0.36, 1) as any,
  },
  100: { opacity: 1, transform: [{ translateY: 0 }], letterSpacing: 3 },
}).duration(800).delay(1400);

export default function BootSplash({ onDone }: { onDone: () => void }) {
  const glowProgress = useSharedValue(0);
  const splashOpacity = useSharedValue(1);

  useEffect(() => {
    glowProgress.value = withRepeat(
      withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );

    const timer = setTimeout(() => {
      splashOpacity.value = withTiming(0, { duration: 600 }, (finished) => {
        if (finished) runOnJS(onDone)();
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [onDone, glowProgress, splashOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(glowProgress.value, [0, 1], [1, 1.18]) }],
    opacity: interpolate(glowProgress.value, [0, 1], [0.35, 0.55]),
  }));

  return (
    <Animated.View style={[styles.container, { opacity: splashOpacity }]}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="midnightBackground" cx="50%" cy="28%" rx="120%" ry="90%" fx="50%" fy="28%">
            <Stop offset="0%" stopColor="#0f2f20" />
            <Stop offset="55%" stopColor="#07120d" />
            <Stop offset="100%" stopColor="#030705" />
          </RadialGradient>
          <RadialGradient id="emeraldGlow">
            <Stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
            <Stop offset="55%" stopColor="#10b981" stopOpacity="0.22" />
            <Stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#midnightBackground)" />
      </Svg>

      <Animated.View pointerEvents="none" style={[styles.glow, glowStyle]}>
        <Svg width="100%" height="100%">
          <Rect width="100%" height="100%" fill="url(#emeraldGlow)" />
        </Svg>
      </Animated.View>

      <View style={styles.content}>
        <Animated.Image
          entering={logoIn}
          source={require('../../assets/images/printit-p.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.brand}>
          <View style={styles.wordRow}>
            {'PrintIt'.split('').map((character, index) => (
              <Animated.Text
                key={`${character}-${index}`}
                entering={letterIn.delay(550 + index * 70)}
                style={[styles.word, index < 5 ? styles.wordPrint : styles.wordIt]}>
                {character}
              </Animated.Text>
            ))}
          </View>
          <Animated.Text entering={bylineIn} style={styles.byline}>
            by Inko
          </Animated.Text>
        </View>
        <Animated.Text entering={FadeInUp.delay(1650).duration(700)} style={styles.tagline}>
          Print from anywhere. Pick up nearby.
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
  },
  content: { alignItems: 'center', paddingHorizontal: 28 },
  logo: {
    width: 104,
    height: 104,
    filter: [{ dropShadow: '0px 12px 28px rgba(16,185,129,0.45)' }],
  },
  brand: { marginTop: 6, alignItems: 'center' },
  wordRow: { flexDirection: 'row' },
  word: { fontSize: 34, fontWeight: '800', letterSpacing: 1, lineHeight: 36 },
  wordPrint: { color: '#ffffff' },
  wordIt: { color: '#6ee7b7' },
  byline: { marginTop: 3, fontSize: 11, fontWeight: '500', letterSpacing: 0.2, color: 'rgba(255,255,255,0.62)' },
  tagline: { marginTop: 8, fontSize: 11, fontWeight: '500', letterSpacing: 0.2, color: 'rgba(255,255,255,0.62)', includeFontPadding: false },
});
