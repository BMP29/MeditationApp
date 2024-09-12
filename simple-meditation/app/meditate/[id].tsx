import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Audio } from 'expo-av';

import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/meditation-data';
import { TimerContext } from '@/context/TimerContext';


const Meditate = () => {

    const { id } = useLocalSearchParams();

    const { duration: secondsRemaning, setDuration } = useContext(TimerContext);

    //const [secondsRemaning, setSecondsRemaning] = useState(10);
    const [isMeditating, setMeditating] = useState(false);
    const [audioSound, setSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Exit 
        if(secondsRemaning === 0) {
            setMeditating(false);
            return;
        }

        if(isMeditating) {
            timerId = setTimeout(() => {
                setDuration(secondsRemaning - 1);
            }, 1000);
        }
        
        return () => {
            clearTimeout(timerId);
        }
    }, [secondsRemaning, isMeditating]);

    useEffect(() => {
        return () => {
            setDuration(10);
            audioSound?.unloadAsync();
        }
    }, [audioSound]);

    const toggleMeditationSessionsStatus = async () => {
        if(secondsRemaning === 0) setDuration(10);

        setMeditating(!isMeditating);

        await toggleSound();
    };

    const toggleSound = async () => {
        const sound = audioSound ? audioSound : await initializeSound();

        const status = await sound?.getStatusAsync();

        if(status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync();
            setPlayingAudio(true);
        }else {
            await sound.pauseAsync();
            setPlayingAudio(false);
        }
    }

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );

        setSound(sound);
        return sound;
    };

    const handleAdjustDuration = () => {
        if(isMeditating) toggleMeditationSessionsStatus();

        router.push('/(modal)/adjust-meditation-duration');
    }

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
                    <CustomButton 
                        title="Adjust Duration" 
                        onPress={handleAdjustDuration}
                    />
                    <CustomButton 
                        title={isMeditating ? 'Stop' : 'Start Meditation'} 
                        onPress={toggleMeditationSessionsStatus}
                        containerStyles='mt-4'
                    />
                </View>
            </AppGradient>
        </ImageBackground>
    </View>
  )
}

export default Meditate

const styles = StyleSheet.create({})