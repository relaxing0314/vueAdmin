let base = process.env.NODE_ENV === 'production' ? '' : '/apis';

export default {
  login: `${base}/login`
}
