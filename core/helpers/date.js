import dayjs from 'dayjs';

const formatDate = (date = new Date(), format = 'D MMMM YYYY, HH:mm:ss') => dayjs(date).format(format);

export default formatDate;
