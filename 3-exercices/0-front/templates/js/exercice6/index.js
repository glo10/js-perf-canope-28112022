await import('./regexjq.js')
const { href } = location

if (/index.html|\//.test(href)) {
  jQuery(function () {
    $('form input').onKeyup()
  })
}
