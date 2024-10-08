import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Data for the intro screens
const data = [
  {
    id: '1',
    title: 'Find Places, Restaurant, and Events.',
    description: 'to collaborate on Barter system.',
    image: require('../../../assets/intro_image_1.png'),
  },
  {
    id: '2',
    title: 'Barter your Service, to get Hosted at cool places.',
    description: 'Volunteer at new places, Meet new people and Socialize.',
    image: require('../../../assets/intro_image_2.png'),
  },
  {
    id: '3',
    title: 'Boost Your Followers with Baatr by Partnering with New Places.',
    description: 'Become Star Influencer and Do Paid Collaboration with Baatr.',
    image: require('../../../assets/intro_image_3.png'),
  },
];

const IntroScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation(); // Use the navigation hook

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index; // Access index correctly
      setCurrentIndex(index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleMomentumScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width); // Calculate the index based on offset

    // Navigate to PhoneAuthScreen if swiped to the last screen
    if (index === data.length - 1) {
      navigation.replace('PhoneAuth'); // Navigate to PhoneAuthScreen
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Show Register button on the last screen */}
      {currentIndex === data.length - 1 && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('PhoneAuth')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Baatr Logo */}
      <Image source={require('../../../assets/Baatr_logo_green2.png')} style={styles.logo} />

      <View style={{ height: 30 }} />{/* Spacer */}
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        ref={flatListRef}
        style={styles.flatList}
        onMomentumScrollEnd={handleMomentumScrollEnd} // Detect the end of scroll
      />
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { backgroundColor: index === currentIndex ? '#054E52' : '#F4CCEE' }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    marginTop: 120, // Adjust as needed for spacing
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute', // Keep logo fixed
    top: 30, // Adjust as needed for spacing
    alignSelf: 'center',
    zIndex: 1, // Ensure the logo stays above other components
  },
  image: {
    width: width,
    height: height * 0.5,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Poppins-Bold', // Ensure title uses Poppins-Bold
    fontSize: 28,
    lineHeight: 30,
    color: '#054E52',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'Poppins-Bold', // Ensure description uses Poppins-Bold
    fontSize: 14,
    lineHeight: 16,
    color: '#054E52',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#054E52',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold', // Ensure button text uses Poppins-Bold
    fontSize: 16,
  },
});

export default IntroScreen;
