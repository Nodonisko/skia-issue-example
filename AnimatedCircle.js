import {
    Canvas,
    Circle,
    Group,
    mix,
    Path,
    Skia,
} from '@shopify/react-native-skia';
import { useState, useEffect } from 'react';
import { Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';



const CANVAS_SIZE = 48;
const RADIUS = 20;

// get random percentage between 0 and 100
const getRandomPercentage = () => Math.floor(Math.random() * 100);

export const AnimatedCircle = ({ percentageOffset = 0 }) => {
    const [percentage, setPercentage] = useState(0);
    const percentageColor = 'red';

    const path = Skia.Path.Make();
    path.addCircle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, RADIUS);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentage(getRandomPercentage());
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const animationProgress = useSharedValue(0);
    // It's neccessary to clamp the value to 0.999 because Skia doesn't support values greater than 1 as end value.
    // And due to javascript floating point precision, 1 is not exactly 1 but little bit more sometimes.
    const percentageFill = useDerivedValue(() => mix(animationProgress.value, 0, 0.999));

    useEffect(() => {
        animationProgress.value = withTiming(percentage / 100, {
            duration: 2000,
            easing: Easing.ease,
        });
    }, [animationProgress, percentage]);

    return (
        <Canvas style={{ height: CANVAS_SIZE, width: CANVAS_SIZE }}>
            <Group
                origin={{ x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 }}
                // Rotating by 25% (default offset) +  sum of percentage of all other displayed currencies. Skia uses radians as units.
                transform={[{ rotate: ((2 * Math.PI) / 100) * (-25 + percentageOffset) }]}
            >
                <Circle
                    cx={CANVAS_SIZE / 2}
                    cy={CANVAS_SIZE / 2}
                    r={RADIUS}
                    // eslint-disable-next-line react/style-prop-object
                    style="stroke"
                    strokeWidth={8}
                    color="lightgrey"
                />
                <Path
                    path={path}
                    start={0}
                    end={percentageFill}
                    // eslint-disable-next-line react/style-prop-object
                    style="stroke"
                    strokeWidth={8}
                    color={percentageColor}
                    opacity={0.3}
                />
            </Group>
        </Canvas>
    );
};