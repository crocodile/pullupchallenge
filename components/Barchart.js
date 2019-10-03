import React from 'react';
import { StyleSheet, View } from 'react-native';
import Bar from '../components/Bar';


function Barchart({ style, valuePairs }) {

    // Calculate the desired height of the bars.
    valuePairs.forEach(valuePair => {

        // Calculate height relative to the first bar.
        let heightPc = 100 * valuePair[1] / valuePairs[0][1];

        // Enforce a minimum height for aesthetic reasons.
        heightPc = (heightPc < MIN_BAR_HEIGHT_PC) ? MIN_BAR_HEIGHT_PC : heightPc;

        // Augment array with the height percentage.
        valuePair[2] = heightPc;

    });

    return (
        <View style={[styles.container_main, style]}>
            {valuePairs.slice(0, NUMBER_OF_BARS).map(function (valuePair,key) {
                return (
                    <Bar
                        style={styles.bar}
                        key={key}
                        label={valuePair ? valuePair[0] : DEFAULT_BAR_LABEL}
                        value={valuePair ? valuePair[1] : DEFAULT_BAR_VALUE}
                        heightPc={valuePair ? valuePair[2] : MIN_BAR_HEIGHT_PC}
                    />);
            })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container_main: {
        flex: 1,
        flexDirection: 'row',
    },
    bar: {
        flex: 1
    }
});

const NUMBER_OF_BARS = 3;
const DEFAULT_BAR_LABEL = "...";
const DEFAULT_BAR_VALUE = 0;
const MIN_BAR_HEIGHT_PC = 25;

export default React.memo(Barchart);