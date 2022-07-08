import { View, Text, StyleSheet } from 'react-native';
import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB, Portal, Provider } from 'react-native-paper';
import { Calendar, CalendarProps } from 'react-native-calendars';

const INITIAL_DATE = new Date().toLocaleString() + '';

const Calendario = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const onDayPress: CalendarProps['onDayPress'] = useCallback(day => {
    setSelected(day.dateString);
  }, []);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#608EDA',
        selectedTextColor: 'black'
      }
    };
  }, [selected]);

  return (
    <Provider>
    <View>
      <Fragment>
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={(day) => console.warn(`${day.dateString} pressed`)}
          markedDates={marked}
        />
      </Fragment>
      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: 'white'}}
          open={open}
          icon={open ? 'plus' : 'plus'}
          actions={[
            {
              icon: '',
              label: 'Teste',
              onPress: () => console.log('oi'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create ({
  texto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendar: {
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Calendario;