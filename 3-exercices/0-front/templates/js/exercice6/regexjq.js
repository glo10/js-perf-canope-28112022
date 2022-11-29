
import * as $ from '../lib/jquery-3.6.1.min.js'

(function ($) {
  $.fn.checkName = function () {
    return /^[a-z]+(?!_)(\s|-)?[a-z]+$/i.test($(this).val())
  }

  $.fn.checkAge = function () {
    const age = +$(this).val() // + operator before string converts string to number
    return /^(1[0-2][0-9]|1[4-9]|[2-9][0-9]|130)$/.test(age)
  }

  $.fn.checkLocation = function () {
    return /^[a-z]+(?!_)(\s|-)?[a-z0-9|\s]+$/i.test($(this).val())
  }

  $.fn.checkEmail = function () {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($(this).val())
  }

  $.fn.checkPassword = function () {
    return /^((?!abcdef|qwerty|azerty|123456)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&\$\+\-\*\/\#~€%^!-_])(?=.)){15,36}/.test($(this).val())
  }

  $.fn.check = function () {
    const el = $(this).get(0).type ?? $(this).get(0).tagName
    switch (el.toLowerCase()) {
      case 'option':
        return $(this).checkLocation()
      case 'number':
        return $(this).checkAge()
      case 'text':
        return $(this).checkName()
      case 'email':
        return $(this).checkEmail()
      case 'password':
        return $(this).checkPassword()
      default:
        throw new Error('Can\'t check data')
    }
  }

  $.fn.onKeyup = function () {
    $(this).on('keyup change', function () {
      if (!$(this).check()) {
        const format = $(this).data('format') ?? 'Format incorrect'
        if ($(this).parent().find('.alert.alert-danger').length === 0) {
          $(this).parent().prepend(`<span class="alert alert-danger">${format}</span>`)
          $(this).parent().find('.alert').animate({ left: '250px', top: '30px' })
        }
      } else {
        $(this).parent().find('.alert').remove()
      }
    })
  }
}(jQuery))
