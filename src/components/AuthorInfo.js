import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const AuthorInfo = (props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1, // Allow the author name container to take all available space
        }}
      >
        <View
          style={{
            borderRadius: 50,
            backgroundColor: '#ffb08f',
            width: 40,
            height: 40,
          }}
        ></View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#0000008e',
                fontSize: 12,
                fontFamily: 'Manrope-medium',
              }}
              numberOfLines={1} // Limit the number of lines to 1
              ellipsizeMode="tail" // Truncate the text with an ellipsis at the end if it overflows
            >
              Published by
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: 700,
                marginTop: 3,
                lineHeight: 16,
                width:150,
                fontFamily: 'Manrope-Bold',
                flexShrink: 1, // Allow the text to shrink if it's too long to fit
              }}
              numberOfLines={1} // Limit the number of lines to 1
              ellipsizeMode="tail" // Truncate the text with an ellipsis at the end if it overflows
            >
              {props.author}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: 'black',
          borderRadius: 50,
          shadowColor: '#000',
          elevation:10,

        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontFamily: 'Nexa-Regular',
          }}
        >
          Follow
        </Text>
      </View>
    </View>
  );
};

export default AuthorInfo;
