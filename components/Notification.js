import { Platform, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { showNotification } from '../store/global/actions';

function Notification(props) {
    const { state, showNotification } = props;

    if (state.showNotification && state.notification?.message) {
        Platform.OS !== 'ios' && ToastAndroid.show(state.notification?.message, ToastAndroid.SHORT);

        setTimeout(function () {
            showNotification();
        }, 3000);
    }

    return (null)
}

export default connect(state => ({ state: state.global }), { showNotification })(Notification);