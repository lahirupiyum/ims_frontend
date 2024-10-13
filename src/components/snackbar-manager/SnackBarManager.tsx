import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';

const SnackBarManager = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {notificationList}  = useAppSelector(state => state.notification);

    useEffect(() => {
        if (notificationList.length === 0) return;
        const latestNotification = notificationList[notificationList.length -1];
        enqueueSnackbar(latestNotification.message, { variant: latestNotification.type});
    },[notificationList])

    return null;
}

export default SnackBarManager;