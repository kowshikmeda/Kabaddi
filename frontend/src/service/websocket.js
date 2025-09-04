import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'universal-cookie';
const WEBSOCKET_URL = 'https://kabaddi1-latest.onrender.com/ws'; // Adjust if your backend port/host is different
const cookies = new Cookies();
 // Assuming the token is stored in a cookie named 'token'
class WebSocketService {
    constructor() {
        this.client = null;
        this.subscriptions = {}; // To keep track of subscriptions
    }

    connect(onConnectCallback) {
        const token = cookies.get('token');
        if (this.client && this.client.connected) {
            console.log('Already connected to WebSocket.');
            onConnectCallback();
            return;
        }

        this.client = new Client({
            webSocketFactory: () => {
                return new SockJS(WEBSOCKET_URL);
            },
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log('WebSocket connected!');
                if (onConnectCallback) {
                    onConnectCallback();
                }
            },
            onDisconnect: () => {
                console.log('WebSocket disconnected!');
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            // Enable debugging logs (optional)
            // debug: (str) => {
            //     console.log(new Date(), str);
            // },
            reconnectDelay: 5000, // Try to reconnect every 5 seconds
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.activate();
    }

    // Subscribe to a specific topic
    subscribe(topic, callback) {
        if (!this.client || !this.client.connected) {
            console.warn('WebSocket not connected. Cannot subscribe to', topic);
            return null;
        }

        if (this.subscriptions[topic]) {
            console.log(`Already subscribed to ${topic}`);
            // If already subscribed, just return the existing subscription object (or handle as needed)
            return this.subscriptions[topic];
        }

        const subscription = this.client.subscribe(topic, message => {
            console.log(`Received message from ${topic}:`, message.body);
            const parsedBody = JSON.parse(message.body);
            callback(parsedBody);
        });
        this.subscriptions[topic] = subscription;
        console.log(`Subscribed to ${topic}`);
        return subscription;
    }

    // Unsubscribe from a topic
    unsubscribe(topic) {
        if (this.subscriptions[topic]) {
            this.subscriptions[topic].unsubscribe();
            delete this.subscriptions[topic];
            console.log(`Unsubscribed from ${topic}`);
        }
    }

    disconnect() {
        if (this.client && this.client.connected) {
            this.client.deactivate();
            this.client = null;
            this.subscriptions = {};
            console.log('WebSocket deactivated.');
        }
    }
}

export default new WebSocketService(); // Export a singleton instance