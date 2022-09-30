const a = document.createElement('script')
//a.src = 'http://localhost:3000/feasy.js'
a.src = 'https://yoshi-program.github.io/Feasy/feasy.js'
a.type = 'text/javascript'
document.head.appendChild(a)

const script1 = document.createElement('script')
script1.type = 'text/javascript'
script1.src = '//code.jquery.com/jquery-1.12.0.min.js'
document.body.appendChild(script1)

const dataList = ['income_2022', 'email']

const noChange = []

const sendData = { list: dataList, sig: noChange }

feasy.buttonAppend('.dmfraZ')
feasy.on((getdata) => {
  if (getdata) {
    const data = getdata.val
    switch (getdata.type) {
      case 'loaded':
        feasy.sendData(sendData)
        feasy.fadeInModal()
        break
      case 'storage':
        feasy.fadeOutModal()
        $('#lastYearlyIncome').val(data.income_2022)
        $('#email').val(data.email)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})
