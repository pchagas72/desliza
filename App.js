// App.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Appbar, Card, Text, Button, Provider as PaperProvider } from 'react-native-paper';

function estadoDeUmidade(umidade) {
    if (umidade < 30) {
        return { color: 'green', message: 'Situação de segurança' };
    } else if (umidade >= 30 && umidade <= 60) {
        return { color: 'yellow', message: 'Situação de perigo moderado' };
    } else if (umidade > 60) {
        return { color: 'red', message: 'Situação de evacuação' };
    }
    return { color: 'gray', message: 'Umidade desconhecida' };
}

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        const dbRef = ref(database, 'Umidade/atual');
        onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    const handleRefresh = () => {
        fetchData(); // Refresh data when the button is pressed
    };

    const { color, message } = data !== null ? estadoDeUmidade(data) : { color: 'gray', message: 'Carregando...' };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    return (
        <PaperProvider>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <Appbar.Header>
                    <Appbar.Content title="Monitor de Umidade" />
                </Appbar.Header>
                <Card style={styles.card}>
                    <Card.Title title="Estado Atual de Umidade" />
                    <Card.Content>
                        <Text style={styles.humidityState}>
                            {estadoDeUmidade(data).message}
                        </Text>
                        <Text style={styles.humidityValue}>
                            {`Umidade: ${data}%`}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={handleRefresh}>
                            Atualizar
                        </Button>
                    </Card.Actions>
                </Card>
                <View style={[styles.statusBox, { backgroundColor: color }]}>
                    <Text style={styles.statusText}>{message}</Text>
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
        padding: 16,
        backgroundColor: '#494949',
    },
    humidityState: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    humidityValue: {
        fontSize: 16,
        marginBottom: 8,
    },
    statusBox: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        borderRadius: 8,
        elevation: 4,
    },
    statusText: {
        fontSize: 18,
        color: '#000000', // Alterado para preto
        textAlign: 'center',
    },
});

export default App;

