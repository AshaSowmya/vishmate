
 
 
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Slideshow from "react-native-image-slider-show";
import axios from 'axios';
import { REACT_APP_API_GATEWAY_URL } from '@env';

const SwiperComponent = () => {
  const [position, setPosition] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/newses`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      console.log('Particulars response:', response.data.news);

      const lastThreeNews = response.data.news.slice(-3);
      const newsImages = lastThreeNews.map(newsItem => ({
        url: newsItem.news_image
      }));
      setDataSource(newsImages);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position => (position === dataSource.length - 1 ? 0 : position + 1));
    }, 3000);

    return () => clearInterval(toggle);
  }, [dataSource.length]);

  return (
    <View style={styles.outerContainer}>
      {loading ? ( // Show loading indicator when data is being fetched
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <Slideshow position={position} dataSource={dataSource} showsPagination={false} arrowSize={0}/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    top: 20,
    width: 380,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SwiperComponent;
