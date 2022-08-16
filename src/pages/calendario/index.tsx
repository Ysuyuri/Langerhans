import { View, Text, StyleSheet } from 'react-native';
import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB, Portal, Provider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(new Date(Date.now()));
    console.log(selectedDate)
  };

  const showMode = () => {
    setShow(true);
  };

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
              label: 'Novo Alarme',
              onPress: showMode,
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChange}
        />
        )}
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