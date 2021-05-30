import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
    skill: string;
}

export function SkillCard({ skill, ...props }: SkillCardProps) {
    return (
        <TouchableOpacity style={styles.buttonSkill} {...props}>
            <Text style={styles.textSkill}>
                {skill}
            </Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding: 20,
        borderRadius: 7,
        alignItems: 'center',
        marginVertical: 10,
    },
    textSkill: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})