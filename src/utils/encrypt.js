import crypto from 'crypto';

const encrypt = (salt, value) => crypto.createHmac('sha256', salt).update(value).digest('hex');

export default encrypt;
