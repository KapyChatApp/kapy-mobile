import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Cấu hình handler cho thông báo
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Hàm gửi thông báo với các tham số tùy chỉnh: title, body, avatar
export async function sendPushNotification(expoPushToken: string, title: string, body: string, avatar: string) {
    console.log("notification-ava: ", avatar);
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: title,   // Tiêu đề thông báo
        body: body,     // Nội dung thông báo
        data: {
            someData: 'goes here',
            avatar: avatar  // Avatar từ ngoài
        },
        icon:avatar
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

// Hàm xử lý lỗi khi đăng ký thông báo
function handleRegistrationError(errorMessage:any) {
    console.error(errorMessage);
    throw new Error(errorMessage);
}

// Hàm đăng ký thông báo, trả về expoPushToken nếu thành công
export async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }

        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }

        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({ projectId })
            ).data;
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}
