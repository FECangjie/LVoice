export default function () {
  if (window.env == 'dev' ) {
    return ''
  } else {
    return 'http://172.30.13.76:12101'
  }
}
