import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '@/components/CustomButton';

const Meditate = () => {

    const { id } = useLocalSearchParams();

    const [secondsRemaning, setSecondsRemaning] = useState(10);
    const [isMeditating, setMeditating] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Exit 
        if(secondsRemaning === 0) {
            setMeditating(false);
            return;
        }

        if(isMeditating) {
            timerId = setTimeout(() => {
                setSecondsRemaning(secondsRemaning - 1);
            }, 1000);
        }
        
        return () => {
            clearTimeout(timerId);
        }
    }, [secondsRemaning, isMeditating]);

    // format the time left to ensure two digits are displayed
    const formatedTimeMinutes = String(Math.floor(secondsRemaning/60)).padStart(2, "00");
    const formattedTimeSeaconds = String(secondsRemaning % 60).padStart(2, "0");

  return (
    <View className='flex-1'>
        <ImageBackground 
            source={MEDITATION_IMAGES[Number(id) - 1]} 
            resizeMode='cover' 
            className='flex-1'
        >
            <AppGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']}>
                <Pressable 
                    onPress={() => router.back()} 
                    className='absolute top-16 left-6 z-10'
                >
                    <AntDesign name="leftcircleo" size={50} color="white" />
                </Pressable>

                <View className='flex-1 justify-center'>
                    <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
                        <Text className='text-4al text-blue-800 font-rmono'>{formatedTimeMinutes}:{formattedTimeSeaconds}</Text>
                    </View>
                </View>

                <View className="mb-5" >
                    <CustomButton title="Start Meditation" onPress={() => setMeditating(true)}/>
                </View>
            </AppGradient>
        </ImageBackground>
    </View>
  )
}

export default Meditate

const styles = StyleSheet.create({})