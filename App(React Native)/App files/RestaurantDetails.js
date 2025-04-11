// RestaurantDetails.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  Share
} from 'react-native';

const { width } = Dimensions.get('window');

const RestaurantDetails = ({ navigation }) => {
  const checkScrollEnd = (e) => {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    if (contentOffset.x + layoutMeasurement.width >= contentSize.width) {
      // Handle scroll end
    }
  };
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewScrollRef = useRef(null);

  const openDirections = () => {
    const mapsUrl = 'https://www.google.com/maps/place/Warakuya+Japanese+Garden/@1.5177825,103.6649605,17z/data=!3m1!4b1!4m6!3m5!1s0x31da73a793ac984d:0xfae93eee1d615b65!8m2!3d1.5177825!4d103.6675354!16s%2Fg%2F11bc8cq6m2?entry=ttu&g_ep=EgoyMDI1MDQwOC4wIKXMDSoASAFQAw%3D%3D';
    
    Linking.canOpenURL(mapsUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Unable to open maps');
        } else {
          return Linking.openURL(mapsUrl);
        }
      })
      .catch((err) => {
        Alert.alert('Error', 'An error occurred while trying to open maps');
        console.error('An error occurred', err);
      });
  };
  
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Share via',
        message: 'Check out this amazing restaurant!\n\nWarakuya Japanese Garden\n2, Jalan Sutera Tanjung 8/4, Taman Sutera Utama',
        url: 'https://example.com/warakuya', // You can replace with your actual URL
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log('Shared with', result.activityType);
        } else {
          // Shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const makePhoneCall = () => {
    const phoneNumber = '+852 92622099';
    let phoneUrl;
    
    if (Platform.OS === 'android') {
      phoneUrl = `tel:${phoneNumber}`;
    } else {
      phoneUrl = `telprompt:${phoneNumber}`;
    }
    
    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(err => {
        console.error('An error occurred', err);
        Alert.alert('Error', 'Failed to make phone call');
      });
  
  };

  const socialPosts = [
    { 
      title: '老得慢的女人', 
      description: '人要懂得爱惜自己，保持关心！', 
      likes: 6, 
      comments: 6,
      image: 'https://placehold.co/250x250'
    },
    { 
      title: '罗马最大的单品出现了！！', 
      description: '美味的热狗，快来尝尝吧！', 
      likes: 8, 
      comments: 3,
      image: 'https://placehold.co/250x250'
    },
    { 
      title: '罗马最大的单品出现了！！', 
      description: '美味的热狗，快来尝尝吧！', 
      likes: 10, 
      comments: 12,
      image: 'https://placehold.co/250x250'
    },
    { 
      title: '罗马最大的单品出现了！！', 
      description: '美味的热狗，快来尝尝吧！', 
      likes: 15, 
      comments: 5,
      image: 'https://placehold.co/250x250'
    }
  ];

  const reviews = [
    {
      title: 'Brilliant Service!',
      rating: '★★★★★',
      text: 'I had an amazing time at this restaurant. The food was delicious, the service was great, and the atmosphere was simply perfect.',
      images: [
        'https://fastly.4sqi.net/img/general/600x600/127599666_TP8Vj_Rh2dLZ03HygI3meXEIulx26QcaM__dZcB4RJs.jpg',
        'https://sethlui.com/wp-content/uploads/2017/07/Warakuya-10-800x534.jpg'
      ]
    },
    {
      title: 'Exceptional Dining Experience!',
      rating: '★★★★★',
      text: 'I had an amazing time at this restaurant. The food was delicious, the service was impeccable, and the atmosphere was simply perfect.',
      images: [
        'https://fastly.4sqi.net/img/general/600x600/127599666_TP8Vj_Rh2dLZ03HygI3meXEIulx26QcaM__dZcB4RJs.jpg',
        'https://sethlui.com/wp-content/uploads/2017/07/Warakuya-10-800x534.jpg'
      ]
    },
    {
      title: 'Fantastic Service and Ambiance',
      rating: '★★★★☆',
      text: 'I was thoroughly impressed with this restaurant. The staff was friendly and attentive, and the overall ambiance was wonderful.',
      images: [
        'https://2.bp.blogspot.com/-0unvCZHVcSs/VACxRe6OOBI/AAAAAAAAAj4/rsGS84f5Skw/s1600/IMG_8117.JPG',
        'https://fastly.4sqi.net/img/general/600x600/10463680_2ArBAwLHtcoyQX5GwkrRrQGplUyi_qV8_hYM7kOMvLY.jpg'
      ]
    }
  ];

  const handleReviewScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (width - 40)); // width - card margins
    setCurrentReviewIndex(index);
  };

  const scrollToReview = (index) => {
    reviewScrollRef.current?.scrollTo({
      x: index * (width - 40),
      animated: true
    });
    setCurrentReviewIndex(index);
  };

  const buttons = [
    { 
      icon: 'https://static-00.iconduck.com/assets.00/call-icon-2047x2048-1v137evf.png', 
      width: 22, 
      alt: 'Call',
      onPress: makePhoneCall
    },
    { 
      icon: 'https://static.vecteezy.com/system/resources/previews/014/455/886/non_2x/share-icon-on-transparent-background-free-png.png', 
      width: 24, 
      alt: 'Share',
      onPress: handleShare
    },
    { 
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-directions-1782209-1512759.png?f=webp&w=256', 
      width: 32, 
      alt: 'Directions',
      onPress: openDirections 
    },
    { 
      icon: 'https://cdn.icon-icons.com/icons2/3912/PNG/512/grab_logo_icon_248153.png', 
      width: 44, 
      alt: 'Grab',
      onPress: () => {} 
    }
  ];

  return (
    <ScrollView style={styles.body} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 80, height: 80}}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.nav}>
        <Text style={styles.navLink} onPress={() => Linking.openURL('food_page_draft.html')}>Food</Text>
        <Text style={styles.navLink} onPress={() => Linking.openURL('shopping_page_draft.html')}>Shopping</Text>
        <Text style={styles.navLink}>About us</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.restaurantDetails}>
          <View style={styles.restaurantHeader}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Gallery')} 
              style={styles.restaurantImageContainer}
            >
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipOCKO_o4KW0WT5SXRxLO-bYwVFLJiklLSUOCcvM=s1360-w1360-h1020' }}
                style={styles.restaurantImage}
              />
            </TouchableOpacity>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>Warakuya Japanese Garden</Text>
              <Text style={styles.cuisineType}>Japanese Cuisine</Text>
              <Text style={styles.rating}>★★★★☆</Text> 
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <View style={styles.buttonsRow}>
              {buttons.map((button, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.circleButton}
                  onPress={button.onPress}
                >
                  <Image 
                    source={{ uri: button.icon }}
                    style={{ 
                      width: button.width,
                      height: button.width,
                      resizeMode: 'contain'
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 15, paddingHorizontal: 10 }}>Reviews</Text>
          
          <ScrollView 
            ref={reviewScrollRef}
            horizontal 
            style={styles.reviewGallery}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={handleReviewScroll}
          >
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{review.title}</Text>
                <Text style={{ fontSize: 16, color: '#ffa500', marginBottom: 8 }}>{review.rating}</Text>
                <Text style={{ fontSize: 14, marginBottom: 15 }}>{review.text}</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {review.images.map((img, imgIndex) => (
                    <Image 
                      key={imgIndex}
                      source={{ uri: img }}
                      style={{ width: 120, height: 120, borderRadius: 6 }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Review Pagination Dots */}
          <View style={styles.paginationDots}>
            {reviews.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentReviewIndex && styles.activeDot
                ]}
                onPress={() => scrollToReview(index)}
              />
            ))}
          </View>
          
          <Text style={styles.leaveReview} onPress={() => Linking.openURL('review_page_draft.html')}>Leave a review</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202002/Maps_Pin_FullColor-x1000.png' }}
                style={{ width: 20, height: 20 }}
              />
              <Text>2, Jalan Sutera Tanjung 8/4, Taman Sutera Utama</Text>
            </View>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://www.iconpacks.net/icons/1/free-phone-icon-1-thumb.png' }}
                style={{ width: 16, height: 16 }}
              />
              <Text>(123) 456-7890</Text>
            </View>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://static-00.iconduck.com/assets.00/money-icon-2048x2048-q99hqr89.png' }}
                style={{ width: 16, height: 16 }}
              />
              <Text>RM25 - RM45/pax</Text>
            </View>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://static.thenounproject.com/png/2683718-200.png' }}
                style={{ width: 16, height: 16 }}
              />
              <Text>Mon-Sat: 11am - 10pm, Sun: 12pm - 9pm</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Featured by Creators</Text>
          <View style={styles.socialPostsContainer}>
            {socialPosts.map((post, index) => (
              <View key={index} style={styles.socialPostCard}>
                <Image 
                  source={{ uri: post.image }}
                  style={styles.socialPostImage}
                />
                <View style={styles.socialPostContent}>
                  <Text style={styles.socialPostTitle}>{post.title}</Text>
                  <Text style={styles.socialPostDescription}>{post.description}</Text>
                  <View style={styles.socialPostStats}>
                    <Text style={styles.statText}>{post.likes} Likes</Text>
                    <Text style={styles.statText}>{post.comments} Comments</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 MakanJB</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    fontFamily: 'Montserrat',
    backgroundColor: '#fffff'
  },
  header: {
    backgroundColor: '#FCF7F3',
    padding: 20,
    alignItems: 'center'
  },
  nav: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  navLink: {
    color: '#333',
    textDecorationLine: 'none',
    marginHorizontal: 8,
    marginVertical: 5,
    fontSize: 14
  },
  container: {
    flex: 1,
    width: width,
    paddingHorizontal: 0
  },
  restaurantDetails: {
    backgroundColor: 'white',
    padding: 15
  },
  restaurantHeader: {
    alignItems: 'center',
    marginBottom: 15
  },
  restaurantImageContainer: {
    width: width,
    height: 250,
    marginBottom: 15
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  restaurantInfo: {
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  restaurantName: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center'
  },
  cuisineType: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    textAlign: 'center'
  },
  rating: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 10,
    textAlign: 'center'
  },
  actionButtonsContainer: {
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%'
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 20 // This adds space between buttons
  },
  circleButton: {
    backgroundColor: '#f2f2f2',
    width: 60, // Increased size
    height: 60, // Increased size
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Small margin between buttons
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewGallery: {
    flexDirection: 'row',
    overflow: 'scroll',
    marginBottom: 10,
    paddingLeft: 10
  },
  reviewCard: {
    width: width - 40,
    padding: 15,
    backgroundColor: '#FCF7F3',
    borderRadius: 8,
    marginRight: 15
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    width: 12
  },
  details: {
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  socialPostsContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20
  },
  socialPostCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: width - 40, // Full width minus padding
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  socialPostImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  socialPostContent: {
    padding: 15,
    alignItems: 'center' // Center content horizontally
  },
  socialPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  socialPostDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center'
  },
  socialPostStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20
  },
  statText: {
    fontSize: 12,
    color: '#888'
  },
  leaveReview: {
    color: 'black',
    textDecorationLine: 'none',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
    width: width
  },
  footerText: {
    color: '#fff',
    fontSize: 14
  }
});

export default RestaurantDetails;
