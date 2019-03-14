const emailRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default emails => {
  emails = emails.replace(/,\s*$/, '')
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => emailRe.test(email) === false)

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}.`
  }

  return null
}
