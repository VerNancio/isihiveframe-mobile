import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import * as Animatable from 'react-native-animatable';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
  withTiming
} from 'react-native-reanimated';

import { UserRequest } from '../../requests/user';



const UserReq = new UserRequest();

export const ProfilePic = (props) => {


  const style = props.style;
  const isStatic = props.static;

  const [isExpanded, setIsExpanded] = useState(false);
  
  const scale = useSharedValue(1); // Estado compartilhado para a escala da imagem

  const marginVertical = useSharedValue(0);

  // Função para mover o objeto para baixo com uma animação
  const movePic = (bool) => {
    if (bool) {
      marginVertical.value = withTiming('10%', { duration: 500 });
      return
    }
    
    marginVertical.value = withTiming(0, { duration: 500 });
  };

  // Função para ampliar a foto quando tocada
  const handlePress = () => {
    if (!isExpanded) {
      movePic(true)
      setTimeout(() => {scale.value = withSpring(1.5)}, 100)
      setIsExpanded(true)

      return
    }

    movePic(false)
    scale.value = withSpring(1); // Amplia a imagem com animação de mola
    setIsExpanded(false)
  };

  // Função para restaurar a escala quando a animação termina
  const handleAnimationEnd = () => {
    scale.value = withSpring(1);
  };

  // Estilo animado para aplicar a escala à imagem
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      marginVertical: marginVertical.value,
    };
  });


  
  //


  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    
    const fetchImage = async () => {
      try {
        
        await UserReq.getProfilePicRequest(setImageBlob, '1234560');
        
      } 
      catch (err) {

        console.error('Erro ao buscar a imagem:', err);
      }
    };

    fetchImage();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isStatic ? () => {return} : handlePress} activeOpacity={0.8}>
        { imageBlob != null ?
        <Animated.Image style={[style, animatedStyle]} onAnimationEnd={runOnJS(handleAnimationEnd)} 
                        // source={require('../../assets/image/teste/asukaringa.jpg')}
                        source={{ uri: `data:image/jpeg;base64,${imageBlob}` }} 
                        />
        :
        <Image style={style} source={require('../../assets/image/no-image.jpg')} />
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});

export default ProfilePic;